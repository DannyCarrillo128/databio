import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { PieGridChartComponent } from './components/pie-grid-chart/pie-grid-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    PieGridChartComponent, 
    PieChartComponent],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports: [
    PieGridChartComponent,
    PieChartComponent
  ]
})
export class ChartsModule { }
