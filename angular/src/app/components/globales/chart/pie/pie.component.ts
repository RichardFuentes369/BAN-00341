import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-globales-chart-pie',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieChartComponent {
  
  // Opciones de configuración de la gráfica
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true
      }
    }
  };

  // Datos falsos (Fake Data) para la gráfica de Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [300, 500, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colores para cada sección
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  public pieChartType: 'pie' = 'pie';

}
