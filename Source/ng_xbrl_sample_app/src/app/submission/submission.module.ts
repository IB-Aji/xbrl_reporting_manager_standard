import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule,
  NbMenuModule, NbSelectModule, NbSidebarModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from '../app-routing.module';
import { CommModule } from './../common/comm.module';
import { SubmissionMonitoringComponent } from './monitoring/submission-monitoring.component';
import { SubmitComponent } from './submit/submit.component';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [SubmitComponent, SubmissionMonitoringComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NbIconModule, NbLayoutModule, NbSidebarModule, NbSelectModule,
    NbButtonModule, NbMenuModule, NbActionsModule, NbCardModule,
    Ng2SmartTableModule,
    TranslateModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    ToolbarModule,
    FileUploadModule,
    ToastModule,
    CalendarModule,
    CommModule,
    DialogModule
  ]
})
export class SubmissionModule { }
