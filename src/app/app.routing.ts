import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideNavgationComponent } from 'src/app/side-navgation/side-navgation.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { ChartComponent } from './chart/chart.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/dashboard',
    pathMatch: 'full'
  },
  { path: 'app', component: SideNavgationComponent,
    children: [
      {
        path: 'datatable',
        component: DatatableComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'chart',
        component: ChartComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}