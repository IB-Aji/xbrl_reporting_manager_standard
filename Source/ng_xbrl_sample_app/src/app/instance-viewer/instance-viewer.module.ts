import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule,
  NbMenuModule, NbSelectModule, NbSidebarModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppRoutingModule } from '../app-routing.module';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InstanceViewerComponent } from './instance-viewer.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [InstanceViewerComponent],
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule, AppRoutingModule,
    NbIconModule, NbLayoutModule, NbSidebarModule,
    NbButtonModule, NbMenuModule, NbActionsModule,
    NbCardModule, NbSelectModule,
    Ng2SmartTableModule, TranslateModule,
    ButtonModule, TableModule, ToolbarModule,
    DropdownModule, CalendarModule
  ]
})
export class InstanceViewerModule { }
