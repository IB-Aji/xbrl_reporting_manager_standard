import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessListComponent } from './access-list/access-list.component';
import { AccessCreateComponent } from './access-create/access-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NbIconModule, NbLayoutModule, NbSidebarModule,
  NbButtonModule, NbMenuModule, NbActionsModule, NbCardModule,NbSelectModule} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NbIconModule, NbLayoutModule, NbSidebarModule,
    NbButtonModule, NbMenuModule, NbActionsModule,
    NbCardModule, NbSelectModule,
    Ng2SmartTableModule,TranslateModule,
    TableModule, InputTextModule, DropdownModule,
    ButtonModule, CalendarModule,
    ToolbarModule, TooltipModule, InputTextareaModule,
    ConfirmPopupModule, ConfirmDialogModule, DialogModule
  ],
  declarations: [AccessListComponent, AccessCreateComponent]
})
export class AccessModule { }
