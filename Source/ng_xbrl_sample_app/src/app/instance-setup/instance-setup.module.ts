import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule, NbButtonModule,
  NbCardModule,
  NbDatepickerModule, NbIconModule,
  NbLayoutModule, NbMenuModule,
  NbSelectModule, NbSidebarModule,
  NbAccordionModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { AppRoutingModule } from '../app-routing.module';
import { InstanceSetupComponent } from '../instance-setup/setup/instance-setup.component';
import { CommModule } from './../common/comm.module';
import { StaticReportComponent } from './static-report/static-report.component';
import {ListboxModule} from 'primeng/listbox';
import { StaticReportMainComponent } from './static-report-main/static-report-main.component';
import { StaticReportListComponent } from './static-report-list/static-report-list.component';
import { StaticReportErrorListComponent } from './static-report-error-list/static-report-error-list.component';
import { StaticReportGeneratePdfComponent } from './static-report-generate-pdf/static-report-generate-pdf.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NbIconModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbActionsModule,
    NbDatepickerModule,
    NbCardModule, NbAccordionModule,
    Ng2SmartTableModule,
    NbSelectModule,
    TranslateModule,
    TableModule, InputTextModule, ProgressBarModule, DropdownModule,
    ButtonModule, DialogModule, ContextMenuModule, MultiSelectModule,
    SliderModule, CalendarModule, ToastModule, ConfirmDialogModule,
    ToolbarModule, FileUploadModule, TooltipModule, InputTextareaModule, ListboxModule,
    ConfirmPopupModule,
    CommModule,
    DynamicDialogModule
  ],
  declarations: [
    InstanceSetupComponent, 
    StaticReportComponent, 
    StaticReportMainComponent, 
    StaticReportListComponent, 
    StaticReportErrorListComponent, 
    StaticReportGeneratePdfComponent
  ],
  entryComponents: [
    StaticReportGeneratePdfComponent
  ]
})
export class InstanceSetupModule { }
