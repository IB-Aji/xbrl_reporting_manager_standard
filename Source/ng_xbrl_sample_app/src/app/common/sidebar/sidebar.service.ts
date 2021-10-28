import { Injectable } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  items: NbMenuItem[] = [
  ];
  constructor() { }
}
