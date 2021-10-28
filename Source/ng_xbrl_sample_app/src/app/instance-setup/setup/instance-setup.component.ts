import { LogDetail } from './../../model/log-detail';
import { LogHeader } from './../../model/log-header';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { TaxonomyRelease } from '../../model/taxonomy-release';
import { LoaderComponent } from './../../common/loader/loader.component';
import { InstanceParameter } from './../../model/instance-parameter';
import { InstanceProcess } from './../../model/instance-process';
import { Parameter } from './../../model/parameter';
import { User } from './../../model/user';
import { InstanceService } from './../../service/instance.service';
import { ParameterService } from './../../service/parameter.service';
import { TaxonomyReleaseService } from './../../service/taxonomy-release.service';


@Component({
  selector: 'app-instance-setup',
  templateUrl: './instance-setup.component.html',
  styleUrls: ['./instance-setup.component.scss'],
  providers: [ParameterService, TaxonomyReleaseService, InstanceService, ConfirmationService],
})
export class InstanceSetupComponent implements OnInit {

  listOfTaxonomy: TaxonomyRelease[];
  selectedTaxonomy: any;

  listOfInstitution: Parameter[];
  selectedInstitutionCode: any;

  listOfSector: Parameter[];
  selectedSectorCode: any;

  listOfFrequency: Parameter[];
  selectedFrequencyCode: any;

  selectedForm: any;
  dataPeriod: any;
  periodFormat: any;
  version: any;
  resultProcess: any;

  listOfInstance: InstanceProcess[];

  fileUpload: any;
  uploadedFile: any;
  reader: FileReader;

  dlgCreateInstance: boolean;
  disableBtn: boolean;
  user: User;

  logsHeader: LogHeader[];
  logsDetail: LogDetail[];

  dlgLogHeader: boolean;
  dlgLogDetail: boolean;

  blob: Blob;

  @ViewChild(LoaderComponent) loader: LoaderComponent;
  constructor(
    private toastrService: NbToastrService,
    public translate: TranslateService,
    private instanceService: InstanceService,
    private parameterService: ParameterService,
    private taxonomyReleaseService: TaxonomyReleaseService,
    private confirmationService: ConfirmationService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.reader = new FileReader();
    this.periodFormat = 'yy/mm/dd';

    this.disableBtn = false;
  }

  ngOnInit(): void {

    const userStr = localStorage.getItem("userData");

    if (userStr != null) {
      this.user = JSON.parse(userStr);
      if (this.user.ljk) {
        // const institutionType: any = JSON.parse(this.user.instType);
        this.selectedInstitutionCode = this.user.instType;
        this.disableBtn = false;
      } else {
        this.disableBtn = true;
        this.toastrService.warning('You do not have the authority to submit a report.', `Info`);
      }
    }

    this.getTaxoReleaseOption();
    this.getInstitutionOption();
    this.getSectorOption();
    this.getFrequencyOption();

  }

  searchData(event: any) {

    if (this.user != null && this.user.ljk != null && this.selectedTaxonomy != null && this.selectedInstitutionCode
      && this.selectedSectorCode != null && this.selectedFrequencyCode != null && this.dataPeriod != null) {

      const param: InstanceParameter = new InstanceParameter();
      param.ljkId = this.user.ljk.id;
      param.taxoRelease = this.selectedTaxonomy;
      param.institution = this.selectedInstitutionCode;
      param.sector = this.selectedSectorCode;
      param.frequency = this.selectedFrequencyCode;
      param.dataPeriod = this.dataPeriod;

      this.loader.show();
      this.instanceService.findTaxonomyForm(param).subscribe(
        (listOfInstance) => {
          this.listOfInstance = listOfInstance;
          this.loader.hide();
        },
        (err) => {
          this.loader.hide();
          this.toastrService.danger(err, 'Error while load Taxonomy Form.');
          console.log(err);
        }
      );

    } else {
      this.toastrService.warning('Please fill all parameter.', 'Info');
    }

  }

  compressInstance(event: Event): void {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to compress and sent to Regulator?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.loader.show();
        let isOK = true;
        for (const item of this.listOfInstance) {
          if (item.processId == null) {
            isOK = false;
            break;
          }
        }
        if (isOK) {

          const param: InstanceParameter = new InstanceParameter();
          param.ljkId = this.user.ljk.id;
          param.taxoRelease = this.selectedTaxonomy;
          param.institution = this.selectedInstitutionCode;
          param.sector = this.selectedSectorCode;
          param.frequency = this.selectedFrequencyCode;
          param.dataPeriod = this.dataPeriod;
          param.userName = this.user.email;

          this.instanceService.compressInstance(param).subscribe(
            (resultProcess) => {
              this.resultProcess = resultProcess;
              if (this.resultProcess.type === 'SUCCESS') {
                this.loader.hide();
                this.searchData(null);
                this.toastrService.success(resultProcess.result, 'Info');
              } else {
                this.loader.hide();
                this.toastrService.warning(resultProcess.result, 'Error Info');
              }
            },
            (err) => {
              this.loader.hide();
              this.toastrService.danger(err, 'Error Info');
              console.log(err);
            }
          );
        } else {
          this.loader.hide();
          this.toastrService.warning('Please make sure all instance already validated.', 'Warning Info');
        }
      },
      reject: () => {
      }
    });
  }

  createInstance(event: Event, instanceProcess: InstanceProcess) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        // this block If use version to create instance
        this.selectedForm = instanceProcess.formId;
        // this.dlgCreateInstance = true;


        const param: InstanceParameter = new InstanceParameter();
        param.ljkId = this.user.ljk.id;
        param.formId = this.selectedForm;
        param.frequency = this.selectedFrequencyCode;
        param.dataPeriod = this.dataPeriod;
        param.version = '1'; // hardcode for version
        param.userName = this.user.email;

        this.loader.show();
        this.instanceService.createInstance(param).subscribe(
          (resultProcess) => {
            this.resultProcess = resultProcess;
            if (this.resultProcess.type === 'SUCCESS') {
              this.loader.hide();
              this.searchData(null);
              this.toastrService.success(resultProcess.result, 'Info');
            } else {
              this.loader.hide();
              this.toastrService.warning(resultProcess.result, 'Error Info');
            }
          },
          (err) => {
            this.loader.hide();
            this.toastrService.danger(err, 'Error while create instance file');
            console.log(err);
          }
        );

      },
      reject: () => {
      }
    });
  }

  proceedInstance() {

    this.dlgCreateInstance = false;

    const param: InstanceParameter = new InstanceParameter();
    param.ljkId = this.user.ljk.id;
    param.formId = this.selectedForm;
    param.frequency = this.selectedFrequencyCode;
    param.dataPeriod = this.dataPeriod;
    param.version = this.version;
    param.userName = this.user.email;

    this.loader.show();
    this.instanceService.createInstance(param).subscribe(
      (resultProcess) => {
        this.resultProcess = resultProcess;
        if (this.resultProcess.type === 'SUCCESS') {
          this.loader.hide();
          this.searchData(null);
          this.toastrService.success(resultProcess.result, 'Info');
        } else {
          this.loader.hide();
          this.toastrService.warning(resultProcess.result, 'Error Info');
        }
      },
      (err) => {
        this.loader.hide();
        this.toastrService.danger(err, 'Error while create instance file');
        console.log(err);
      }
    );

  }

  validateInstance(event: Event, instanceProcess: InstanceProcess) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (instanceProcess.processId) {

          this.loader.show();
          const param: InstanceParameter = new InstanceParameter();
          param.ljkId = this.user.ljk.id;
          param.formId = instanceProcess.formId;
          param.frequency = this.selectedFrequencyCode;
          param.dataPeriod = this.dataPeriod;
          param.version = instanceProcess.version;
          param.userName = this.user.email;

          this.instanceService.validateInstance(param).subscribe(
            (resultProcess) => {
              this.resultProcess = resultProcess;
              if (this.resultProcess.type === 'SUCCESS') {
                this.loader.hide();
                this.searchData(null);
                this.toastrService.success(resultProcess.result, 'Info');
              } else {
                this.loader.hide();
                this.toastrService.warning(resultProcess.result, 'Error Info');
              }
            },
            (err) => {
              this.loader.hide();
              this.toastrService.danger(err, 'Error while validate instance file');
              console.log(err);
            }
          );

        } else {
          this.toastrService.warning('Please create instance file first.', 'Error Info');
        }


      },
      reject: () => {
      }
    });
  }

  downloadFile(event: Event, instanceProcess: InstanceProcess) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (instanceProcess.processId) {

          this.loader.show();
          const param: InstanceParameter = new InstanceParameter();
          param.ljkId = this.user.ljk.id;
          param.formId = instanceProcess.formId;
          param.frequency = this.selectedFrequencyCode;
          param.dataPeriod = this.dataPeriod;
          param.version = instanceProcess.version;
          param.userName = this.user.email;
          param.processId = instanceProcess.processId;

          this.instanceService.downloadFile(param).subscribe(
            (resultProcess) => {
              console.log(resultProcess);
              this.blob = new Blob([resultProcess]);
              console.log(this.blob);
              var downloadURL = window.URL.createObjectURL(this.blob);
              var link = document.createElement('a');
              link.href = downloadURL;
              link.download = instanceProcess.formName + '.xlsx';
              link.click();
              this.loader.hide();
              this.toastrService.success("File successfully downloaded.", 'Info');
            },
            (err) => {
              this.loader.hide();
              this.toastrService.danger(err, 'Error while download file');
              console.log(err);
            }
          );

        } else {
          this.toastrService.warning('Please create instance file first.', 'Error Info');
        }


      },
      reject: () => {
      }
    });
  }

  validateAllInstance(event: Event): void {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.loader.show();
        let isOK = true;
        for (const item of this.listOfInstance) {
          if (item.processId == null) {
            isOK = false;
            break;
          }
        }
        if (isOK) {

          const param: InstanceParameter = new InstanceParameter();
          param.ljkId = this.user.ljk.id;
          param.taxoRelease = this.selectedTaxonomy;
          param.institution = this.selectedInstitutionCode;
          param.sector = this.selectedSectorCode;
          param.frequency = this.selectedFrequencyCode;
          param.dataPeriod = this.dataPeriod;
          param.userName = this.user.email;

          this.instanceService.validateAllInstance(param).subscribe(
            (resultProcess) => {
              this.resultProcess = resultProcess;
              if (this.resultProcess.type === 'SUCCESS') {
                this.loader.hide();
                this.searchData(null);
                this.toastrService.success(resultProcess.result, 'Info');
              } else {
                this.loader.hide();
                this.toastrService.warning(resultProcess.result, 'Error Info');
              }
            },
            (err) => {
              this.loader.hide();
              this.toastrService.danger(err, 'Error while validate instance file');
              console.log(err);
            }
          );
        } else {
          this.loader.hide();
          this.toastrService.warning('Please create all instance files first.', 'Warning Info');
        }

      },
      reject: () => {
      }
    });
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
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

  viewLogCreation(processId: number) {
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

  viewLogValidation(processId: number) {
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

  viewLogHeader(processId: number) {
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

}
