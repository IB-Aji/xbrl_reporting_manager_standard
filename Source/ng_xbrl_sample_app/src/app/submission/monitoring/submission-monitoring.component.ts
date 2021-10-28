import { InstanceService } from 'src/app/service/instance.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Account } from 'src/app/model/account';
import { Customer } from 'src/app/model/customer';
import { Transaction } from 'src/app/model/transaction';
import { ParameterService, TaxonomyReleaseService } from 'src/app/service';
import { SubmissionService } from 'src/app/service/submission.service';
import { LoaderComponent } from './../../common/loader/loader.component';
import { InstanceParameter } from './../../model/instance-parameter';
import { LogDetail } from './../../model/log-detail';
import { LogHeader } from './../../model/log-header';
import { Parameter } from './../../model/parameter';
import { SummarySubmission } from './../../model/summary-submission';
import { TaxonomyRelease } from './../../model/taxonomy-release';


@Component({
  selector: 'app-submission-monitoring',
  templateUrl: './submission-monitoring.component.html',
  styleUrls: ['./submission-monitoring.component.scss'],
  providers: [ParameterService, TaxonomyReleaseService, SubmissionService, InstanceService],
})
export class SubmissionMonitoringComponent implements OnInit {

  listOfSummary: SummarySubmission[];

  listOfInstitution: Parameter[];
  selectedInstitutionCode: any;

  listOfFrequency: Parameter[];
  selectedFrequencyCode: any;

  listOfSector: Parameter[];
  selectedSectorCode: any;

  listOfTaxonomy: TaxonomyRelease[];
  selectedTaxonomy: TaxonomyRelease;

  listOfCustomer: Customer[];
  listOfAccount: Account[];
  listOfTransaction: Transaction[];

  logsHeader: LogHeader[];
  logsDetail: LogDetail[];

  dlgLogHeader: boolean;
  dlgLogDetail: boolean;

  dataPeriod: any;
  periodFormat: any;
  periodTableFormat: any;

  customerDialog: boolean;
  accountDialog: boolean;
  transactionDialog: boolean;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private toastrService: NbToastrService,
    public translate: TranslateService,
    private submissionService: SubmissionService,
    private parameterService: ParameterService,
    private taxonomyReleaseService: TaxonomyReleaseService,
    private instanceService: InstanceService,
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.periodFormat = 'yy/mm/dd';
    this.periodTableFormat = 'yyyy/MM/dd';
  }

  ngOnInit(): void {

    this.getInstitutionOption();
    this.getTaxoReleaseOption();
    this.getFrequencyOption();
    this.getSectorOption();

  }

  onChangeFrequency(event: any) {
    // 1:Daily, 3:Monthly, 6:Yearly
    if (this.selectedFrequencyCode === '1') {
      this.periodFormat = 'yy/mm/dd';
      this.periodTableFormat = 'yyyy/MM/dd';
    } else if (this.selectedFrequencyCode === '3') {
      this.periodFormat = 'yy/mm';
      this.periodTableFormat = 'yyyy/MM';
    } else if (this.selectedFrequencyCode === '6') {
      this.periodFormat = 'yy';
      this.periodTableFormat = 'yyyy';
    }
  }

  searchData(event: any) {

    const param: InstanceParameter = new InstanceParameter();
    param.taxoRelease = this.selectedTaxonomy.id;
    param.institution = this.selectedInstitutionCode;
    param.sector = this.selectedSectorCode;
    param.frequency = this.selectedFrequencyCode;
    param.dataPeriod = this.dataPeriod;

    this.loader.show();
    this.submissionService.findSubmission(param).subscribe(
      (listOfSummary) => {
        this.loader.hide();
        this.listOfSummary = listOfSummary;
      },
      (err) => {
        this.loader.hide();
        this.toastrService.danger(err, 'Error while load Summary Submission.');
        console.log(err);
      }
    );

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

  viewLogCreation(processId: number){
    this.dlgLogHeader = true;

    this.instanceService.findLogHeaderCreation(processId).subscribe(
      (logsHeader) => {
        this.logsHeader = logsHeader;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Log Header.');
        console.log(err);
      }
    );
  }

  viewLogValidation(processId: number){
    this.dlgLogHeader = true;

    this.instanceService.findLogHeaderValidation(processId).subscribe(
      (logsHeader) => {
        this.logsHeader = logsHeader;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Log Header.');
        console.log(err);
      }
    );
  }

  viewLogHeader(processId: number){
    this.dlgLogHeader = true;

    this.instanceService.findLogHeader(processId).subscribe(
      (logsHeader) => {
        this.logsHeader = logsHeader;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Log Header.');
        console.log(err);
      }
    );
  }

  viewLogDetail(logHeader: LogHeader) {
    this.dlgLogHeader = false;
    this.dlgLogDetail = true;

    this.instanceService.findLogDetail(logHeader.id).subscribe(
      (logsDetail) => {
        this.logsDetail = logsDetail;
      },
      (err) => {
        this.toastrService.danger(err, 'Error while load Log Detail.');
        console.log(err);
      }
    );
  }

  backLogHeader() {
    this.dlgLogDetail = false;
    this.dlgLogHeader = true;
  }

  viewDetail(processId: string, fileName: string) {
    let test: string[] = fileName.split("-");

    // Customer
    if (test[4].startsWith("10001000")) {
      this.customerDialog = true;
      this.submissionService.getCustomers(processId).subscribe(
        (listOfCustomer) => {
          this.listOfCustomer = listOfCustomer;
          console.log(this.listOfCustomer);
        },
        (err) => {
          this.toastrService.danger(err, 'Error while load Customer data.');
          console.log(err);
        }
      );
    }

    // Account
    if (test[4].startsWith("10002000")) {
      this.accountDialog = true;
      this.submissionService.getAccounts(processId).subscribe(
        (listOfAccount) => {
          this.listOfAccount = listOfAccount;
          console.log(this.listOfAccount);
        },
        (err) => {
          this.toastrService.danger(err, 'Error while load Account data.');
          console.log(err);
        }
      );
    }

    // Transaction
    if (test[4].startsWith("10003000")) {
      this.transactionDialog = true;
      this.submissionService.getTransactions(processId).subscribe(
        (listOfTransaction) => {
          this.listOfTransaction = listOfTransaction;
          console.log(this.listOfTransaction);
        },
        (err) => {
          this.toastrService.danger(err, 'Error while load Transaction data.');
          console.log(err);
        }
      );
    }
  }

}
