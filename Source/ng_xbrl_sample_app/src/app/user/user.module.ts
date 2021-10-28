import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule, NbButtonModule,
  NbCardModule, NbIconModule,
  NbLayoutModule, NbMenuModule,
  NbSelectModule, NbSidebarModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from '../app-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';

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
    NbCardModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
    NbSelectModule,
    TranslateModule,
    TableModule, InputTextModule, DropdownModule,
    ButtonModule, CalendarModule, PasswordModule,
    ToolbarModule, TooltipModule, InputTextareaModule,
    MultiSelectModule
  ],
  declarations: [UserListComponent, UserCreateComponent],
})
export class UserModule { }
