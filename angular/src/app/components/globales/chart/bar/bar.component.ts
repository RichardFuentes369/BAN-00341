import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-globales-chart-bar',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
})
export class BarChartComponent {
  // Opciones de configuración para la gráfica de barras
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  // Datos falsos (Fake Data) para las barras
  public barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'Ventas 2026',
        backgroundColor: '#36A2EB',
        borderColor: '#2A82BE',
        borderWidth: 1
      },
      {
        data: [28, 48, 40, 19, 86],
        label: 'Gastos 2026',
        backgroundColor: '#FF6384',
        borderColor: '#CC4F6A',
        borderWidth: 1
      }
    ]
  };

  public barChartType: 'bar' = 'bar';
}
