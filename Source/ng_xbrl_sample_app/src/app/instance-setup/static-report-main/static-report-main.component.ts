import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NbCardBodyComponent, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Parameter } from 'src/app/model';
import { TaxonomyRelease } from 'src/app/model/taxonomy-release';
import { StaticReportService } from 'src/app/service';
import { User } from './../../model/user';
import { StaticReportHeader, isStatusNotSubmittedYet, isStatusValidated, isStatusSubmittedAndNotValidated } from '../../model/static-report/static-report-header'
import { StaticReportForm } from '../../model/static-report/static-report-form'
import { LoaderComponent } from 'src/app/common/loader/loader.component';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { StaticReportGeneratePdfComponent } from '../static-report-generate-pdf/static-report-generate-pdf.component';

@Component({
  selector: 'app-static-report-main',
  templateUrl: './static-report-main.component.html',
  styleUrls: ['./static-report-main.component.css'],
  providers: [StaticReportService, ConfirmationService  
    ,DialogService
  ]
})
export class StaticReportMainComponent implements OnInit {

  blob: Blob;
  header: StaticReportHeader = new StaticReportHeader();
  selectedForm: StaticReportForm;
  domParser: DOMParser;
  reader: FileReader;

  private sub: any;

  @ViewChild('formElement') formElement: ElementRef<HTMLFormElement>;
  @ViewChild(LoaderComponent) loader: LoaderComponent;

  @ViewChild('divSectionToolbar') divSectionToolbar: ElementRef<HTMLDivElement>;
  @ViewChild('divSectionValidationResult') divSectionValidationResult: ElementRef<HTMLDivElement>;
  @ViewChild('divSectionForm') divSectionForm: ElementRef<HTMLDivElement>;

  constructor(
    private toastrService: NbToastrService,
    public translate: TranslateService,
    private staticReportService: StaticReportService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private confirmationService: ConfirmationService
    ,public dialogService: DialogService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.header.status = 'NOT_SUBMITTED_YET';

    this.domParser = new DOMParser();
    this.reader = new FileReader();
  }

  ngOnInit(): void {
    let headerId: number;
    this.sub = this.activeRoute.params.subscribe((params) => {
      headerId = params['id'];
    });

    const userStr = localStorage.getItem("userData");

    if (headerId) {
      this.staticReportService.findById(headerId).subscribe((header) => {
        this.header = header;
        this.selectedForm = this.header.formList[0];
        this.onChangeForm();
      }, (err) => {
        this.toastrService.danger('Error while getting static report data');
      })
    }
  }

  backToList() {
    this.router.navigate(['/home/instance/static-report-setup'], { relativeTo: this.activeRoute });
  }

  ngAfterViewInit() {
    this.divSectionForm.nativeElement.style.height = "35rem";
  }

  onDestroy() {
    this.sub.unsubscribe();
  }

  onChangeForm() {
    this.loader.show();
    this.staticReportService.getWebFormDocument(this.header.documentName, this.selectedForm.code).subscribe((webFormDocumentStr: string) => {
      const webFormDocument: Document = this.domParser.parseFromString(webFormDocumentStr, 'text/html');
      this.loadForm(webFormDocument);
      this.loader.hide();
    }, (err) => {
      this.toastrService.danger('Error while loading Web Form Document')
      console.log(err);
      this.loader.hide();
    })
  }

  isNotSubmittedYet(): boolean {
    return isStatusNotSubmittedYet(this.header);
  }

  isValidated(): boolean {
    return isStatusValidated(this.header);
  }

  isSubmittedButNotValidatedYet(): boolean {
    return isStatusSubmittedAndNotValidated(this.header);
  }

  isCorrectableReportState(): boolean {
    return (this.header.status === 'CREATION_FAILED' || this.header.status === 'VALIDATION_FAILED');
  }

  correctReport(event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.staticReportService.doSimpleCorrection(this.header.id).subscribe((res) => {
          this.header.status = 'NOT_SUBMITTED_YET';
          this.updateFormContainerHeight(true);
          this.adjustToEnableFormState();
          this.toastrService.info('repost in correction state')
        }, (err) => {
          this.toastrService.danger('request for correction is failed');
        });
      },
      reject: () => {
      }
    });
  }



  loadForm(webFormDocument: Document): void {
    for (var i = 0; i < this.formElement.nativeElement.childNodes.length; i++) {
      const node: Node = this.formElement.nativeElement.childNodes.item(i);
      this.renderer.removeChild(this.formElement.nativeElement, node);
    }

    for (var i = 0; i < webFormDocument.body.childNodes.length; i++) {
      const node: Node = webFormDocument.body.childNodes.item(i);
      if (node.nodeType == Node.TEXT_NODE) continue;
      this.renderer.appendChild(this.formElement.nativeElement, node);
    }

    this.adjustToDisableFormState();
  }

  adjustToDisableFormState() {
    if (!this.isNotSubmittedYet()) {
      const inputNodes = this.formElement.nativeElement.querySelectorAll("input, select");
      for (let index = 0; index < inputNodes.length; index++) {
        const element = <HTMLInputElement>inputNodes.item(index);
        element.disabled = true;
      }
    }
  }

  adjustToEnableFormState() {
    if (this.isNotSubmittedYet()) {
      const inputNodes = this.formElement.nativeElement.querySelectorAll("input, select");
      for (let index = 0; index < inputNodes.length; index++) {
        const element = <HTMLInputElement>inputNodes.item(index);
        element.disabled = false;
      }
    }
  }

  saveForm() {
    this.loader.show();

    const inputParams = {};
    for (var i = 0; i < this.formElement.nativeElement.elements.length; i++) {
      const name: string = this.formElement.nativeElement.elements.item(i).getAttribute('name');
      const value: string = this.formElement.nativeElement.elements[name].value;
      inputParams[name] = value;
    }

    this.staticReportService.saveForm(inputParams, this.header.documentName, this.selectedForm.code).subscribe((malformid) => {
      this.loader.hide();
      this.toastrService.info('Form is successfuly saved');
    }, (err) => {
      this.loader.hide();
      console.error(err);
      this.toastrService.danger('Failed to save the Form');
    })
  }

  submitReport(event) {
    const formList = this.header.formList;

    this.confirmationService.confirm({
      target: event.target,
      message: 'Please save the form before submitting the report, Are you sure that you want to proceed ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.staticReportService.submitForValidation(this.header).subscribe(() => {
          this.header.status = 'NOT_PROCESSED_YET';
          this.adjustToDisableFormState();
          this.toastrService.info('Report is successfully sumbitted');
        }, (err) => {
          this.toastrService.danger('Error while submitting the report');
        })
      },
      reject: () => {
      }
    });
  }

  validateReport(): void {
    this.loader.show();
    this.staticReportService.validateStaticReport(this.header.id).subscribe((res) => {
      this.loader.hide();
    }, (err) => {
      this.loader.hide();
    });
  }

  downloadExcelFile(): void {
    this.loader.show();
    this.staticReportService.downloadExcelFile(this.header.documentName).subscribe(
      (resultProcess) => {
        this.blob = new Blob([resultProcess]);
        var downloadURL = window.URL.createObjectURL(this.blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.header.documentName + '.zip';
        link.click();
        this.loader.hide();
        this.toastrService.success("File successfully downloaded.", 'Info');
      },
      (err) => {
        this.loader.hide();
        this.toastrService.danger(err, 'Error while downloading exel file');
        console.log(err);
      }
    );
  }

  downloadInstanceFile(): void {
    this.loader.show();
    this.staticReportService.downloadInstanceFile(this.header.documentName).subscribe(
      (resultProcess) => {
        this.blob = new Blob([resultProcess]);
        var downloadURL = window.URL.createObjectURL(this.blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.header.documentName + '.zip';
        link.click();
        this.loader.hide();
        this.toastrService.success("File successfully downloaded.", 'Info');
      },
      (err) => {
        this.loader.hide();
        this.toastrService.danger(err, 'Error while downloading instance file');
        console.log(err);
      }
    );
  }


  generatePDFFile(): void {
    const ref = this.dialogService.open(StaticReportGeneratePdfComponent, {
      data: {
        header: this.header
      },
      header: 'Generate PDF',
      width: '70%',
      height: '40em'
    });
    
  }


  uploadExcel(event, excelFileUpload: FileUpload) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed ? Upload excel will submit the report and make it waiting for validation',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loader.show();
        const uploadedFile: File = event.files[0];
        this.reader.readAsDataURL(uploadedFile);
        this.reader.onload = () => {
          this.staticReportService.uploadExcelFile(this.header.documentName, this.reader.result).subscribe(() => {
            // loader hide is called under onchange form method
            this.header.status = 'NOT_PROCESSED_YET';
            this.onChangeForm();
            excelFileUpload.clear();
            this.toastrService.info('Uploading excel file sucessfully finish');
          }, (err) => {
            this.loader.hide();
            excelFileUpload.clear();
            this.toastrService.danger('Uploading excel file failed');
            console.error(err);
          })
        };
      },
      reject: () => {
        excelFileUpload.clear();
      }
    });
  }


  uploadInstance(event, instanceFileUpload: FileUpload) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed ? Upload Instance File will submit the report and make it waiting for validation',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loader.show();
        const uploadedFile: File = event.files[0];
        this.reader.readAsDataURL(uploadedFile);
        this.reader.onload = () => {
          this.staticReportService.uploadInstanceFile(this.header.documentName, this.reader.result).subscribe(() => {
            // loader hide is called under onchange form method
            this.header.status = 'NOT_PROCESSED_YET';
            this.onChangeForm();
            instanceFileUpload.clear();
            this.toastrService.info('Uploading instance file sucessfully finish');
          }, (err) => {
            this.loader.hide();
            instanceFileUpload.clear();
            this.toastrService.danger('Uploading instance file failed');
            console.error(err);
          })
        };
      },
      reject: () => {
        instanceFileUpload.clear();
      }
    });
  }


  onErrorIdDblClicked(event){
    let element: HTMLElement = <HTMLElement> document.querySelectorAll(`[name=${event.option}]`).item(0);
    
    if(element) {
      element.scrollIntoView(false);
      element.style.background = '#ff000033';
      setTimeout(() => {
        element.style.background = null;
      }, 1000);
    } else {
      this.toastrService.info('Input not found')
    }
  }

  onValidationResultCollapsedChange(colapse) {
    this.updateFormContainerHeight(colapse);
  }

  updateFormContainerHeight(colapse) {
    if(!colapse){
      this.divSectionForm.nativeElement.style.height = "19rem";
    } else {
      this.divSectionForm.nativeElement.style.height = "35rem";
    }
  }

}
