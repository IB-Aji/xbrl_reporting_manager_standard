import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [DatePipe],
})
export class SidebarComponent implements OnInit {
  items: NbMenuItem[] = [
  ];

  myDate = new Date();
  dateStr = "";
  constructor(
    public sidebarservice: NbSidebarService,
    public itemSidebarService: SidebarService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarservice.toggle();
    return false;
  }

}
