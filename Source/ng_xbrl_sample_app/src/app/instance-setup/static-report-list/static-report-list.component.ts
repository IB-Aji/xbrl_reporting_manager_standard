import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../model/user';
import { StaticReportHeader } from '../../model/static-report/static-report-header';
import { ViewStaticReportHeader  } from '../../model/static-report/view-static-report-header';
import { StaticReportService } from 'src/app/service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-static-report-list',
  templateUrl: './static-report-list.component.html',
  styleUrls: ['./static-report-list.component.css'],
  providers: [StaticReportService]
})
export class StaticReportListComponent implements OnInit {

  
  public staticReportHeaders: ViewStaticReportHeader[];
  cols: any[];
  first = 0;
  rows = 10;
  loading: boolean = true;
  settings: any;

  user: User;

  constructor(
    private toastrService: NbToastrService,
    private router: Router,
    private staticReportService: StaticReportService,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    const userStr = localStorage.getItem("userData");

    if (userStr != null) {
      this.user = JSON.parse(userStr);
      if (!this.user.ljk) {
        this.toastrService.danger('You do not have the authority to submit a report.', `Info`);
      }
    }

  }

  ngOnInit() {
    this.getAllStaticReportHeaderForUser();
  }

  getAllStaticReportHeaderForUser() {
    this.staticReportService.findByLjk(this.user.ljk.id).subscribe(
      staticReportHeaders => {
        this.staticReportHeaders = staticReportHeaders;
      },
      err => {
        console.log(err);
      }

    );
  }

  formatForReportingFreq(freqCode: string) {
    // 1:Daily, 3:Monthly, 6:Yearly
    if (freqCode === '1' || freqCode === 'Daily') {
      return 'yy/mm/dd';
    } else if (freqCode === '3' || freqCode === 'Monthly') {
      return 'yy/mm';
    } else if (freqCode === '6' || freqCode === 'Yearly') {
      return 'yyyy';
    }
  }

  redirectNewStaticReportPage() {
    this.router.navigate(['create'], { relativeTo: this.activeRoute });
  }

  openUnSubmittedPage(staticReportHeader: StaticReportHeader) {
    if (staticReportHeader) {
      this.router.navigate(['main', staticReportHeader.id], { relativeTo: this.activeRoute });
    }
  }

  onDelete(event): void {
    this.deleteUnsubmittedReport(event.data);
  }

  deleteUnsubmittedReport(header: StaticReportHeader) {
    if (header) {
      this.staticReportService.deleteStaticReportById(header.id).subscribe(
        res => {
          this.getAllStaticReportHeaderForUser();
          this.router.navigate(['./'], { relativeTo: this.activeRoute });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
