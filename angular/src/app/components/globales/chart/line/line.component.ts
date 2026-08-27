import { Component } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-globales-chart-line',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineChartComponent {

  // Opciones de configuración para la gráfica de líneas
  public lineChartOptions: ChartOptions<'line'> = {
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

  // Datos falsos (Fake Data) para las líneas
  public lineChartLabels: string[] = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'];
  
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [120, 150, 180, 140, 220],
        label: 'Tráfico Web',
        fill: true,
        tension: 0.4, // Curvatura de las líneas (0 = rectas, >0 = curvas suaves)
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36A2EB',
        pointBackgroundColor: '#36A2EB',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#36A2EB'
      },
      {
        data: [80, 110, 130, 95, 170],
        label: 'Conversiones',
        fill: false,
        tension: 0.4,
        borderColor: '#FF6384',
        pointBackgroundColor: '#FF6384',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF6384'
      }
    ]
  };

  public lineChartType: 'line' = 'line';
}