import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule, NbButtonModule,
  NbCardModule,
  NbDatepickerModule, NbIconModule,
  NbLayoutModule, NbMenuModule,
  NbSelectModule, NbSidebarModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
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
import { AppRoutingModule } from '../app-routing.module';
import { EntrypointCreateComponent } from './entrypoint/entrypoint-create/entrypoint-create.component';
import { EntrypointListComponent } from './entrypoint/entrypoint-list/entrypoint-list.component';
import { MappingCreateComponent } from './mapping/mapping-create/mapping-create.component';
import { MappingListComponent } from './mapping/mapping-list/mapping-list.component';
import { ReleaseCreateComponent } from './release/release-create/release-create.component';
import { ReleaseListComponent } from './release/release-list/release-list.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


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
    NbCardModule,
    Ng2SmartTableModule,
    NbSelectModule,
    TranslateModule,
    TableModule, InputTextModule, ProgressBarModule, DropdownModule,
    ButtonModule, DialogModule, ContextMenuModule, MultiSelectModule,
    SliderModule, CalendarModule, ToastModule, ConfirmPopupModule,
    ToolbarModule, FileUploadModule, TooltipModule, InputTextareaModule
  ],
  declarations: [ReleaseCreateComponent, ReleaseListComponent, EntrypointCreateComponent,
    EntrypointListComponent, MappingCreateComponent, MappingListComponent],
})
export class TaxonomyModule { }
