import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonLoginComponent } from './common-login/common-login.component';
import { HomeComponent } from './home/home.component';
import { TopNavBarComponent } from './topbar/top-nav-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from '../app-routing.module';
import {NbIconModule, NbLayoutModule, NbSidebarModule,
  NbButtonModule, NbMenuModule, NbActionsModule, NbCardModule, NbSelectModule, NbOptionModule, NbUserModule, NbContextMenuModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { TranslateModule } from '@ngx-translate/core';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PerfectScrollbarModule,
    AppRoutingModule,
    NbIconModule,
    NbSidebarModule,
    NbLayoutModule,
    NbButtonModule,
    NbMenuModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbCardModule,
    NbSelectModule,
    NbOptionModule,
    NbUserModule,
    NbContextMenuModule,
    TranslateModule,
    DialogModule,
    ButtonModule,
    TooltipModule
  ],
  declarations: [ CommonLoginComponent, HomeComponent,
  TopNavBarComponent, FooterComponent, LoginComponent, 
  LoaderComponent, SidebarComponent],
  exports: [TopNavBarComponent, FooterComponent, LoaderComponent]
})
export class CommModule { }
