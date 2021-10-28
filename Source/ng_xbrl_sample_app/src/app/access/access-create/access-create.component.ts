import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccessService } from '../../service/access.service';
import { Access } from '../../model/access';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-access-create',
  templateUrl: './access-create.component.html',
  styleUrls: ['./access-create.component.scss'],
  providers: [AccessService, ConfirmationService]
})
export class AccessCreateComponent implements OnInit, OnDestroy {

  id: number;
  access: Access;
  accessForm: FormGroup;
  private sub: any;
  typeOption: any[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private accessService: AccessService,
    private toastrService: NbToastrService,
    private confirmationService: ConfirmationService) {

    this.typeOption = [{ label: 'VIEW', value: 'GET' },
    { label: 'CREATE', value: 'POST' },
    { label: 'UPDATE', value: 'PUT' },
    { label: 'DELETE', value: 'DELETE' }];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.accessForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      path: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });

    if (this.id) { // edit form
      this.accessService.findById(this.id).subscribe(
        role => {
          this.id = role.id;
          this.accessForm.patchValue({
            name: role.name,
            description: role.description,
            path: role.path,
            type: role.type
          });
        }, error => {
          console.log(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.accessForm.valid) {

      const access: Access = new Access(this.id);
      access.name = this.accessForm.controls['name'].value;
      access.description = this.accessForm.controls['description'].value;
      access.path = this.accessForm.controls['path'].value;
      access.type = this.accessForm.controls['type'].value;
      if (this.id) {

        this.accessService.updateAccess(access).subscribe(
          res => {
            this.accessForm.reset();
            this.redirectAccessPage();
          },
          err => {
            console.log(err);
          }

        )
      } else {
        this.accessService.saveAccess(access).subscribe(
          res => {
            this.accessForm.reset();
            console.log('role saved  :' + access);
            this.redirectAccessPage();
          },
          err => {
            console.log(err);
          });
      }

    }
  }

  redirectAccessPage() {
    this.router.navigate(['access'], { relativeTo: this.activeRoute.parent });
  }

  submitAccessForm(event: Event): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit();
      },
      reject: () => {
      }
    });
  }

}
