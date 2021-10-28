import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StaticReportHeader } from 'src/app/model/static-report/static-report-header';
import { StaticReportValidationErrorItem } from 'src/app/model/static-report/static-report-validation-error-item';
import { StaticReportService } from 'src/app/service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-static-report-error-list',
  templateUrl: './static-report-error-list.component.html',
  styleUrls: ['./static-report-error-list.component.css'],
  providers: [StaticReportService]
})
export class StaticReportErrorListComponent implements OnInit {

  validationErrorItems: StaticReportValidationErrorItem[];
  selectedError: StaticReportValidationErrorItem;
  cols: any[];
  first = 0;
  rows = 5;
  loading: boolean = true;
  settings: any;
  currentErrorIds: string[] = [];

  @Input()
  public headerId: number;

  @Output()
  public onErrorIdDblClicked : EventEmitter<any> = new EventEmitter();

  constructor(private toastrService: NbToastrService,
    public translate: TranslateService,
    private staticReportService: StaticReportService) {
      this.translate.addLangs(['en', 'in']);
      this.translate.setDefaultLang('en');
      this.translate.use('en');
  }

  ngOnInit(): void {
    this.getValidationErrorForHeader();
  }

  getValidationErrorForHeader() {
    this.staticReportService.findValidationErrorItem(this.headerId).subscribe(
      validationErrorItems => {
        this.validationErrorItems = validationErrorItems;
      },
      err => {
        console.log(err);
      }
    );
  }

  onRowSelect() {
    this.currentErrorIds = this.selectedError.errorIds;
  }

  focusToErrorId(event) {
    this.onErrorIdDblClicked.emit(event);
  }

}
