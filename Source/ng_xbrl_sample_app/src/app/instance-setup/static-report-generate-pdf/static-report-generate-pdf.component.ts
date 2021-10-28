import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoaderComponent } from 'src/app/common/loader/loader.component';
import { StaticReportForm } from 'src/app/model/static-report/static-report-form';
import { StaticReportHeader } from 'src/app/model/static-report/static-report-header';
import { StaticReportService } from 'src/app/service';

@Component({
  selector: 'app-static-report-generate-pdf',
  templateUrl: './static-report-generate-pdf.component.html',
  styleUrls: ['./static-report-generate-pdf.component.css'],
  providers: [StaticReportService]
})
export class StaticReportGeneratePdfComponent implements OnInit {

  header : StaticReportHeader;
  selectedForms: StaticReportForm[];
  blob: Blob;

  @ViewChild(LoaderComponent) loader: LoaderComponent;
  

  constructor(public ref: DynamicDialogRef, 
      public config: DynamicDialogConfig,
      private staticReportService: StaticReportService,
      private toastrService: NbToastrService) {
        this.header = this.config.data.header;
  }

  ngOnInit(): void {
  }

  generatePDFFile() {
    if(this.selectedForms.length == 0) {
      this.toastrService.warning('Please select at lease one form');
      return;
    }
    this.loader.show();
    let htmlForms: string = '';
    this.selectedForms.forEach(form => {
      htmlForms += form.code + ".html,";
    });
    htmlForms = htmlForms.substring(0, htmlForms.length - 1 );
    this.staticReportService.generatePDFFile(this.header.documentName, htmlForms).subscribe(
      (resultProcess) => {
        this.blob = new Blob([resultProcess]);
        var downloadURL = window.URL.createObjectURL(this.blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.header.documentName + '.pdf';
        link.click();
        this.loader.hide();
        this.toastrService.success("File successfully downloaded.", 'Info');
        this.ref.close();
      },
      (err) => {
        this.loader.hide();
        this.toastrService.danger(err, 'Error while generating PDF file');
        console.log(err);
      }
    );
  }

}
