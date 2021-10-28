import { Component, Input, OnInit } from '@angular/core';
import { CoordinationService } from '../../service/coordination.service';
@Component({
  selector: 'image-thumbnail',
  template: `
   <a href="javascript:void(0)" (click)="download()">download</a>
`,
providers: [CoordinationService]
})
export class ImageThumbnailComponent implements OnInit {
  @Input() value: string;
  @Input() rowData: any;

  blob: Blob;

  constructor(
    private coordinationService: CoordinationService
  ) {
  }
  ngOnInit(): void {
  }

  download() {

    console.log(this.rowData);
    this.coordinationService.downloadAttachment(1, this.rowData.originalFile).subscribe(
      (data) => {

        this.blob = new Blob([data]);

        var downloadURL = window.URL.createObjectURL(this.blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.rowData.originalFile;
        link.click();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}