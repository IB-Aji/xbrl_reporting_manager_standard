import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ParameterService, TaxonomyEntrypointService, TaxonomyReleaseService } from '../../../service';
import { RoleService } from '../../../service/role.service';
import { Ljk } from '../../../model/ljk';
import { Parameter } from '../../../model/parameter';
import { Role } from '../../../model/role';
import { TaxonomyEntrypoint } from '../../../model/taxonomy-entrypoint';
import { LjkService } from './../../../service/ljk.service';
import { TaxonomyRelease } from 'src/app/model/taxonomy-release';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-entrypoint-create',
  templateUrl: './entrypoint-create.component.html',
  styleUrls: ['./entrypoint-create.component.scss'],
  providers: [TaxonomyEntrypointService, RoleService, LjkService, ParameterService, TaxonomyReleaseService, ConfirmationService],
})
export class EntrypointCreateComponent implements OnInit, OnDestroy {

  private sub: any;
  id: number;
  taxonomyEntryPoint: TaxonomyEntrypoint;

  listOfInstitution: Parameter[];
  selectedInstitution: Parameter;

  listOfFrequency: Parameter[];
  selectedFrequency: Parameter;

  listOfSector: Parameter[];
  selectedSector: Parameter;

  listOfTaxonomy: TaxonomyRelease[];
  selectedTaxonomy: TaxonomyRelease;

  selectedPath: string;
  pathOption: any[];
  formList: any[];

  reader: FileReader;
  settings: any;

  selectedInstitutionCode: string;
  selectedSectorCode: string;
  selectedFrequencyCode: string;

  constructor(
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private taxonomyEntryPointService: TaxonomyEntrypointService,
    private parameterService: ParameterService,
    private taxonomyReleaseService: TaxonomyReleaseService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.reader = new FileReader();

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.getTaxoReleaseOption();
    this.getInstitutionOption();
    this.getFrequencyOption();
    this.getSectorOption();

    if (this.id) {

      this.taxonomyEntryPointService.findById(this.id).subscribe(
        (taxonomyEntryPoint: TaxonomyEntrypoint) => {
          this.id = taxonomyEntryPoint.id;

          this.taxonomyEntryPoint = taxonomyEntryPoint;
          this.selectedTaxonomy = taxonomyEntryPoint.taxonomyRelease;
          this.onChangeTaxoRelease(null);

          this.selectedInstitutionCode = this.taxonomyEntryPoint.institutionType;

          this.selectedSectorCode = this.taxonomyEntryPoint.sector;

          this.selectedFrequencyCode = this.taxonomyEntryPoint.frequencePeriod;

          console.log(this.taxonomyEntryPoint);
          this.selectedPath = this.taxonomyEntryPoint.entrypointPath;

          this.pathSelected(null);
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

  onSubmit(event: any) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const taxonomyEntryPoints: TaxonomyEntrypoint[] = [];

        const entryPoint: TaxonomyEntrypoint = new TaxonomyEntrypoint(this.id);
        entryPoint.taxonomyRelease = this.selectedTaxonomy;
        entryPoint.entrypointPath = this.selectedPath;
        entryPoint.frequencePeriod = this.selectedFrequencyCode;
        entryPoint.institutionType = this.selectedInstitutionCode;
        entryPoint.sector = this.selectedSectorCode;

        taxonomyEntryPoints.push(entryPoint);

        if (this.id) {
          this.taxonomyEntryPointService.updateListTaxonomyEntrypoint(taxonomyEntryPoints).subscribe(
            (res) => {
              console.log('taxonomyEntryPoint updated  :' + taxonomyEntryPoints);
              this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
              this.redirectTaxonomyEntryPointPage();
            },
            (err) => {
              this.toastrService.danger(err, `Error Info`);
              console.log(err);
            }
          );
        } else {

          this.taxonomyEntryPointService.saveListTaxonomyEntrypoint(taxonomyEntryPoints).subscribe(
            (res) => {
              this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
              this.redirectTaxonomyEntryPointPage();
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

  getInstitutionOption(): void {
    this.parameterService.findByType('INSTITUTION').subscribe(
      (institutionOption) => {
        this.listOfInstitution = institutionOption;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Institution.');
        console.log(err);
      }
    );
  }

  getFrequencyOption(): void {
    this.parameterService.findByType('FREQ').subscribe(
      (frequencyOption) => {
        this.listOfFrequency = frequencyOption;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Frequency Reporting.');
        console.log(err);
      }
    );
  }

  getSectorOption(): void {
    this.parameterService.findByType('SECTOR').subscribe(
      (sectorOption) => {
        this.listOfSector = sectorOption;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Sector.');
        console.log(err);
      }
    );
  }

  getTaxoReleaseOption(): void {
    this.taxonomyReleaseService.findAll().subscribe(
      (res) => {
        this.listOfTaxonomy = res;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Taxonomy Release.');
        console.log(err);
      }
    );
  }

  redirectTaxonomyEntryPointPage() {
    this.router.navigate(['taxonomy/entrypoint'], { relativeTo: this.activeRoute.parent });
  }

  pathSelected(event: any) {

    const entryPoint: TaxonomyEntrypoint = new TaxonomyEntrypoint(0);
    entryPoint.taxonomyRelease = this.selectedTaxonomy;
    entryPoint.entrypointPath = this.selectedPath;
    this.taxonomyEntryPointService.getMasterForm(entryPoint).subscribe(
      (res) => {
        this.formList = res;
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );


  }

  onChangeTaxoRelease(event: any) {

    this.taxonomyReleaseService.findEntryPath(this.selectedTaxonomy.id).subscribe(
      (res) => {
        if (res) {
          this.pathOption = res;
        }
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );
  }

}
