import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Parameter } from '../model';
import { SummarySubmission } from '../model/summary-submission';
import { TaxonomyRelease } from '../model/taxonomy-release';
import { ParameterService, TaxonomyReleaseService } from '../service';
import { InstanceService } from './../service/instance.service';

@Component({
  selector: 'app-instance-viewer',
  templateUrl: './instance-viewer.component.html',
  styleUrls: ['./instance-viewer.component.scss'],
  providers: [InstanceService, ParameterService, TaxonomyReleaseService]
})
export class InstanceViewerComponent implements OnInit {

  listOfInstitution: Parameter[];
  selectedInstitutionCode: any;

  listOfSector: Parameter[];
  selectedSectorCode: any;

  listOfFrequency: Parameter[];
  selectedFrequencyCode: any;

  listOfTaxonomy: TaxonomyRelease[];
  selectedTaxonomy: TaxonomyRelease;

  listOfSummary: SummarySubmission[];

  dataPeriod: any;
  periodFormat: any;

  constructor(
    private toastrService: NbToastrService,
    public translate: TranslateService,
    private instanceService: InstanceService,
    private parameterService: ParameterService,
    private taxonomyReleaseService: TaxonomyReleaseService,
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.periodFormat = 'yy/mm/dd';
  }

  ngOnInit(): void {
    this.getInstitutionOption();
    this.getTaxoReleaseOption();
    this.getFrequencyOption();
    this.getSectorOption();
  }

  searchData(event: any) {
    let testDate: Date = new Date(this.dataPeriod);
    console.log(this.dataPeriod);
    console.log(testDate);
    console.log(testDate.getDate());
    console.log(testDate.getMonth() + 1);
    console.log(testDate.getFullYear());

  }

  onChangeFrequency(event: any) {
    if (this.selectedFrequencyCode === 'DAILY') {
      this.periodFormat = 'yy/mm/dd';
    } else if (this.selectedFrequencyCode === 'MONTHLY') {
      this.periodFormat = 'yy/mm';
    } else if (this.selectedFrequencyCode === 'YEARLY') {
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

}
