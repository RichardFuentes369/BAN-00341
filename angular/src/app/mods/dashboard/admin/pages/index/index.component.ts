import { Component } from '@angular/core';
import { ReporteWarehouseComponent } from '../../components/reporte-warehouse/reporte-warehouse.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    ReporteWarehouseComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class AdminDashboardComponent {

}
