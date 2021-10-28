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
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from '../app-routing.module';
import { LjkCreateComponent } from './ljk-create/ljk-create.component';
import { LjkListComponent } from './ljk-list/ljk-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NbIconModule, NbLayoutModule, NbSidebarModule,
    NbButtonModule, NbMenuModule, NbActionsModule,
    NbCardModule, NbSelectModule,
    Ng2SmartTableModule,
    TranslateModule,
    TableModule, InputTextModule, DropdownModule,
    ButtonModule, CalendarModule,
    ToolbarModule, TooltipModule, InputTextareaModule
  ],
  declarations: [LjkListComponent, LjkCreateComponent]
})
export class LjkModule { }
