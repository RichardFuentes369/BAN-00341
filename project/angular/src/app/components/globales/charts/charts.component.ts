import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-globales-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  
  @Input() title: string = '';
  @Input() chartType: ChartType = 'bar';
  @Input() chartData: ChartData<any> = { labels: [], datasets: [] };
  @Input() chartOptions: ChartOptions<any> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true }
    }
  };

}
