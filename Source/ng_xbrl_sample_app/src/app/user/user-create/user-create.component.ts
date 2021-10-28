import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ParameterService, UserService } from 'src/app/service';
import { RoleService } from 'src/app/service/role.service';
import { Ljk } from '../../model/ljk';
import { Parameter } from '../../model/parameter';
import { Role } from '../../model/role';
import { User } from '../../model/user';
import { LjkService } from './../../service/ljk.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [UserService, RoleService, LjkService, ParameterService],
})
export class UserCreateComponent implements OnInit, OnDestroy {

  id: number;
  user: User;
  private sub: any;

  email: any;
  firstName: any;
  lastName: any;
  password: any;
  retypePassword: any;

  roles: Role[];
  selectedRoleId: any[];

  typeOption: any[];
  selectedUserType: any;

  ljkTypeOption: Parameter[];
  selectedInstitutionCode: any;

  ljkOption: Ljk[];
  selectedLJK: any;

  uploadedFile: any;
  uploadedFileString: any;
  avatar: any;
  isLJK: boolean;

  reader: FileReader;

  constructor(
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private ljkService: LjkService,
    private parameterService: ParameterService,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.reader = new FileReader();
    this.isLJK = false;

    this.typeOption = [
      { label: 'System', value: 'SYSTEM' },
      { label: 'Regulator', value: 'REGULATOR' },
      { label: 'Lembaga Jasa Keuangan', value: 'INSTITUTION' }];

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });


    this.getAllRoles();
    this.getLjkTypeOption();

    if (this.id) {
      // edit form
      this.userService.findById(this.id).subscribe(
        (user: User) => {

          console.log(user);

          this.email = user.email;
          this.firstName = user.firstName;
          this.lastName = user.lastName;

          this.selectedRoleId = [];
          for (let index in user.roles) {
            this.selectedRoleId.push((user.roles[index].id));
          }

          this.selectedUserType = user.userType;
          this.selectedInstitutionCode = user.instType;
          this.selectedLJK = user.ljk ? user.ljk.id : null;

          if (this.selectedInstitutionCode) {
            this.getAllLjk(this.selectedInstitutionCode);
          }

          this.userTypeSelected(null);
          this.instTypeSelected(null);

        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {

    const user: User = new User(
      this.id,
      this.email,
      this.firstName,
      this.lastName,
      this.email,
      this.password
    );

    const selectedRoles: Role[] = [];

    for (let item of this.selectedRoleId) {
      const role = new Role(item)
      selectedRoles.push(role);
    }

    user.roles = selectedRoles;

    user.userType = this.selectedUserType;
    if (this.isLJK) {
      user.instType = this.selectedInstitutionCode;
      user.ljk = new Ljk(this.selectedLJK);
    } else {
      user.instType = null;
      user.ljk;
    }


    if (this.avatar) {
      user.avatar = this.avatar;
    }
    if (this.id) {
      this.userService.updateUser(user).subscribe(
        (res) => {
          console.log('user updated  :' + user);
          this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
          this.redirectUserPage();
        },
        (err) => {
          this.toastrService.danger(err, `Error Info`);
          console.log(err);
        }
      );
    } else {

      this.userService.findByEmail(user.email).subscribe(
        (res) => {
          if (res) {
            this.toastrService.warning('User with this email is already exist, Please input with other email address.', `Warning!`);
          } else {

            this.userService.saveUser(user).subscribe(
              (res) => {
                this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
                this.redirectUserPage();
              },
              (err) => {
                this.toastrService.danger(err, `Error Info`);
                console.log(err);
              }
            );

          }
        },
        (err) => {
          this.toastrService.danger(err, `Error Info`);
          console.log(err);
        }
      );


    }


  }

  redirectUserPage() {
    this.router.navigate(['user'], { relativeTo: this.activeRoute.parent });
  }

  getAllRoles() {
    this.roleService.findAll().subscribe(
      (roles) => {
        this.roles = roles;
        console.log(roles);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelect(event: any) {
    let fileList: FileList = event.target.files;
    this.uploadedFile = fileList[0];
    this.reader.readAsDataURL(this.uploadedFile);
    this.reader.onload = () => {
      this.avatar = this.reader.result;
    };
  }

  userTypeSelected(event: any) {
    if (this.selectedUserType === 'INSTITUTION') {
      this.isLJK = true;
    } else {
      this.isLJK = false;
      this.selectedInstitutionCode = null;
      this.selectedLJK = null;
    }
  }

  instTypeSelected(event: any) {
    this.getAllLjk(this.selectedInstitutionCode);
  }

  getLjkTypeOption() {
    this.parameterService.findByType('INSTITUTION').subscribe(
      (ljkTypeOption) => {
        this.ljkTypeOption = ljkTypeOption;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllLjk(type: string) {
    this.ljkService.findByType(type).subscribe(
      (ljkOption) => {
        this.ljkOption = ljkOption;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('retypePassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
