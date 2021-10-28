import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Parameter } from 'src/app/model';
import { TaxonomyRelease } from 'src/app/model/taxonomy-release';
import { ParameterService, TaxonomyReleaseService, StaticReportService, TaxonomyEntrypointService } from 'src/app/service';
import { User } from './../../model/user';
import { StaticReportHeader } from '../../model/static-report/static-report-header'
import { StaticReportForm } from '../../model/static-report/static-report-form'
import { LoaderComponent } from 'src/app/common/loader/loader.component';

@Component({
  selector: 'app-static-report',
  templateUrl: './static-report.component.html',
  styleUrls: ['./static-report.component.css'],
  providers: [ParameterService, TaxonomyReleaseService, StaticReportService, TaxonomyEntrypointService]
})
export class StaticReportComponent implements OnInit {

  disableSubmit: boolean;
  disableGetForms: boolean;

  listOfInstitution: Parameter[];
  selectedInstitutionCode: any;

  listOfFrequency: Parameter[];
  selectedFrequencyCode: any;

  listOfSector: Parameter[];
  selectedSectorCode: any;

  listOfUnitCurrency: Parameter[];
  selectedUnitCurrencyCode: any;

  listOfTaxonomy: TaxonomyRelease[];
  selectedTaxonomy: any;

  dataPeriod: any;
  periodFormat: any;

  user: User;

  header: StaticReportHeader;
  selectedForms: StaticReportForm[];


  @ViewChild(LoaderComponent) loader : LoaderComponent;
  constructor(
    private toastrService: NbToastrService,
    public translate: TranslateService,
    private parameterService: ParameterService,
    private taxonomyReleaseService: TaxonomyReleaseService,
    private staticReportService: StaticReportService,
    private entrypointService: TaxonomyEntrypointService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.disableSubmit = false;
    this.disableGetForms = false;

    this.selectedForms = [];
    this.header = new StaticReportHeader();
  }

  ngOnInit(): void {
    const userStr = localStorage.getItem("userData");

    if (userStr != null) {
      this.user = JSON.parse(userStr);
      if (this.user.ljk) {
        // const institutionType: any = JSON.parse(this.user.instType);
        this.selectedInstitutionCode = this.user.instType;
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
        this.toastrService.danger('You do not have the authority to submit a report.', `Info`);
      }
    }

    this.getTaxoReleaseOption();
    this.getInstitutionOption();
    this.getFrequencyOption();
    this.getSectorOption();
    this.getUnitCurrencyOption();
  }

  backToList() {
    this.router.navigate(['/home/instance/static-report-setup'], { relativeTo: this.activeRoute });
  }

  onSubmit(): void {
    if (!this.doValidateHeader()) {
      return;
    }

    const deiForm = this.selectedForms.find(form => form.code == "1000000");

    if (!deiForm) {
      this.toastrService.warning("[1000000] DEI form must be selected");
      return;
    }

    this.header.formList = this.selectedForms;
    this.loader.show();
    this.staticReportService.initialSubmit(this.header).subscribe((savedHeader) => {
      this.loader.hide();
      this.router.navigate(['../main', savedHeader.id], { relativeTo: this.activeRoute });
    }, (err) => {
      this.loader.hide();
      this.toastrService.danger('Error while initial submit of static report');
      console.error(err);
    })

  }

  async onGetForms() {
    this.header.entrypoint = null;
    this.header.dataPeriod = this.dataPeriod;
    this.header.ljk = this.user.ljk;
    this.header.unitCurrency = this.selectedUnitCurrencyCode;

    this.entrypointService.getTaxonomyEntryPoint(this.selectedTaxonomy,
      this.selectedInstitutionCode, this.selectedSectorCode, this.selectedFrequencyCode).subscribe((res) => {
        this.header.entrypoint = res;
        if (!this.doValidateHeader()) {
          return;
        }
    
        this.staticReportService.getAllFormsOfAnEntrypoint(this.header.entrypoint.id, this.header.unitCurrency).subscribe((forms) => {
          this.header.formList = forms;
        }, (err) => {
          this.toastrService.danger('Error while loading Static Report Forms');
        });
      }, (err) => {
          this.toastrService.danger('Error while getting entrypoint data');
      });
  }

  doValidateHeader(): boolean {
    if (!this.header.dataPeriod) {
      this.toastrService.warning("Please input all required data");
      return false;
    }
    if (!this.header.entrypoint) {
      this.toastrService.warning("Entrypoint is not found, Please make sure combination (taxonom release, institution, sector, reporting frequence) is match");
      return false;
    }
    return true;
  }

  onChangeFrequency(event: any) {
    // 1:Daily, 3:Monthly, 6:Yearly
    if (this.selectedFrequencyCode === '1') {
      this.periodFormat = 'yy/mm/dd';
    } else if (this.selectedFrequencyCode === '3') {
      this.periodFormat = 'yy/mm';
    } else if (this.selectedFrequencyCode === '6') {
      this.periodFormat = 'yy';
    }
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

  getUnitCurrencyOption(): void {
    this.parameterService.findByType('UNITCURRENCY').subscribe(
      (unitCurrency) => {
        this.listOfUnitCurrency = unitCurrency;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Unit Currency.');
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

}
