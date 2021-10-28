import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ParameterService, TaxonomyReleaseService, RoleService } from '../../../service';
import { TaxonomyRelease } from '../../../model/taxonomy-release';
import { LjkService } from '../../../service/ljk.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-taxonomy-release-create',
  templateUrl: './release-create.component.html',
  styleUrls: ['./release-create.component.scss'],
  providers: [TaxonomyReleaseService, RoleService, LjkService, ParameterService, ConfirmationService],
})
export class ReleaseCreateComponent implements OnInit, OnDestroy {

  id: number;
  taxonomyRelease: TaxonomyRelease;
  private sub: any;

  uploadedFile: any;
  fileUpload: any;

  releaseDate: Date;
  version: any;
  desc: any;
  disabled: boolean;

  reader: FileReader;

  constructor(
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private taxonomyReleaseService: TaxonomyReleaseService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    router.events.subscribe(console.log);

    this.reader = new FileReader();
    this.disabled = false;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.id) {
      // edit form
      this.taxonomyReleaseService.findById(this.id).subscribe(
        (taxonomyRelease: TaxonomyRelease) => {
          this.id = taxonomyRelease.id;

          this.releaseDate = new Date(taxonomyRelease.releaseDate);
          this.version = taxonomyRelease.version;
          this.desc = taxonomyRelease.description;
          this.disabled = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onTest() {

    console.log(this.releaseDate);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(event: any) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const taxonomyRelease: TaxonomyRelease = new TaxonomyRelease(this.id);

        taxonomyRelease.releaseDate = this.releaseDate;
        taxonomyRelease.version = this.version;
        taxonomyRelease.description = this.desc;
        taxonomyRelease.fileUpload = this.fileUpload;

        if (this.id) {
          this.taxonomyReleaseService.updateTaxonomyRelease(taxonomyRelease).subscribe(
            (res) => {
              this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
              this.redirectTaxonomyReleasePage();
            },
            (err) => {
              this.toastrService.danger(err, `Error Info`);
              console.log(err);
            }
          );
        } else {

          this.taxonomyReleaseService.saveTaxonomyRelease(taxonomyRelease).subscribe(
            (res) => {
              this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
              this.redirectTaxonomyReleasePage();
            },
            (err) => {
              this.toastrService.danger(err, `Error Info`);
              console.log(err);
            }
          );
        }

      },
      reject: () => {
      }
    });

  }

  redirectTaxonomyReleasePage() {
    this.router.navigate(['taxonomy/release'], { relativeTo: this.activeRoute.parent });
  }

  onSelect(event: any) {
    let fileList: FileList = event.target.files;
    this.uploadedFile = fileList[0];
    this.reader.readAsDataURL(this.uploadedFile);
    this.reader.onload = () => {
      this.fileUpload = this.reader.result;

    };
  }

}
