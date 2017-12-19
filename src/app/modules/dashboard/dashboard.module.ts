import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

import { BarChartComponent } from '../../components/charts/bar-chart.component';

@NgModule({
  imports:    [ CommonModule, DashboardRoutingModule ],
  declarations: [ DashboardComponent, BarChartComponent ],
  providers: [ DashboardService ]
})
export class DashboardModule { }