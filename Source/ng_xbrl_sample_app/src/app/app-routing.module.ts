import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authservice';
import { HomeComponent } from './common/home/home.component';
import { StaticReportComponent } from './instance-setup/static-report/static-report.component';
import { StaticReportMainComponent } from './instance-setup/static-report-main/static-report-main.component';
import { StaticReportListComponent } from './instance-setup/static-report-list/static-report-list.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'instance/static-report-setup/create', component: StaticReportComponent, canActivate: [AuthGuard] },
      { path: 'instance/static-report-setup/main/:id', component: StaticReportMainComponent, canActivate: [AuthGuard]},
      { path: 'instance/static-report-setup', component: StaticReportListComponent, canActivate: [AuthGuard]},
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
