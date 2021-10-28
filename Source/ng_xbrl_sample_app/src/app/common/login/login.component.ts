
import { Component, OnInit, ViewChild} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service';
import { first } from 'rxjs/operators';
import $ from 'jquery';
import { NbToastrService  } from '@nebular/theme';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NbToastrService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  passIcon = 'eye-outline';
  @ViewChild(LoaderComponent) loader: LoaderComponent;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: NbToastrService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
      $(this).on('blur', function () {
        if ($(this).val().trim() != '') {
          $(this).addClass('has-val');
        } else {
          $(this).removeClass('has-val');
        }
      });
    });

    /*==================================================================
  [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
      var check = true;

      // for (var i = 0; i < input.length; i++) {
      //   if (validate(input[i]) == false) {
      //     showValidate(input[i]);
      //     check = false;
      //   }
      // }

      return check;
    });

    $('.validate-form .input100').each(function () {
      $(this).focus(function () {
        hideValidate(this);
      });
    });

    function validate(input) {
      if (
        $(input).attr('type') == 'email' ||
        $(input).attr('name') == 'email'
      ) {
        if (
          $(input)
            .val()
            .trim()
            .match(
              /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
            ) == null
        ) {
          return false;
        }
      } else {
        if ($(input).val().trim() == '') {
          return false;
        }
      }
    }

    function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
  [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
      if (showPass == 0) {
        $(this).next('input').attr('type', 'text');
        showPass = 1;
      } else {
        $(this).next('input').attr('type', 'password');
        showPass = 0;
      }
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;

    }

    this.loading = true;
    this.loader.show();
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loader.hide();
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
          this.loader.hide();

          console.log(error);
          this.toastService.danger(error,'Error Login');
          throw error;
        }
      );
  }

  iconClick(){
    if(this.passIcon == 'eye-outline'){
      this.passIcon = 'eye-off-outline';
    }else{
      this.passIcon = 'eye-outline';
    }
  }
}
