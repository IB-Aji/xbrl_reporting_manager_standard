import { Ljk } from './../../model/ljk';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Parameter } from 'src/app/model';
import { TaxonomyRelease } from 'src/app/model/taxonomy-release';
import { ParameterService, TaxonomyReleaseService } from 'src/app/service';
import { SubmissionService } from '../../service/submission.service';
import { Submission } from './../../model/submission';
import { User } from './../../model/user';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
  providers: [ParameterService, TaxonomyReleaseService, SubmissionService],
})
export class SubmitComponent implements OnInit {

  listOfInstitution: Parameter[];
  selectedInstitutionCode: any;

  listOfFrequency: Parameter[];
  selectedFrequencyCode: any;

  listOfSector: Parameter[];
  selectedSectorCode: any;

  listOfTaxonomy: TaxonomyRelease[];
  selectedTaxonomy: any;
  taxonomy: TaxonomyRelease;

  dataPeriod: any;
  periodFormat: any;

  fileUpload: any;
  uploadedFile: any;
  reader: FileReader;

  disableSubmit: boolean;
  user: User;

  constructor(
    private toastrService: NbToastrService,
    public translate: TranslateService,
    private submissionService: SubmissionService,
    private parameterService: ParameterService,
    private taxonomyReleaseService: TaxonomyReleaseService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.reader = new FileReader();
    this.periodFormat = 'yy/mm/dd';

    this.disableSubmit = false;
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

  }

  testSetValue() {
    this.disableSubmit = true;
  }

  onSubmit(): void {

    const submission: Submission = new Submission();
    for (const item of this.listOfTaxonomy) {
      if (item.id === this.selectedTaxonomy) {
        submission.taxonomyRelease = item;
        break;
      }
    }
    submission.institutionType = this.selectedInstitutionCode;
    submission.frequencePeriod = this.selectedFrequencyCode;
    submission.sector = this.selectedSectorCode;
    submission.dataPeriod = this.dataPeriod;
    submission.fileUpload = this.fileUpload;
    submission.ljk = this.user.ljk;
    submission.submitMethod = 'Web Online';

    console.log(submission);
    this.submissionService.submitReporting(submission).subscribe(
      (res) => {
        console.log(res);
        this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
      },
      (err) => {
        this.toastrService.danger(err, `Error while Submission.`);
        console.log(err);
      }
    );
  }

  onSelect(event: any) {
    let fileList: FileList = event.target.files;
    this.uploadedFile = fileList[0];
    this.reader.readAsDataURL(this.uploadedFile);
    this.reader.onload = () => {
      this.fileUpload = this.reader.result;
    };
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
