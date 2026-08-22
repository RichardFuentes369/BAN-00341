import { Component } from '@angular/core';
import { ReporteWarehouseComponent } from '../../components/reporte-warehouse/reporte-warehouse.component';
import { Scanner13Component } from '@component/globales/scanner13/scanner13.component';
import { FiltroLoteComponent } from '../../components/filtro/filtro.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    ReporteWarehouseComponent,
    Scanner13Component,
    FiltroLoteComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class AdminDashboardComponent {

  showDetailProduct = true

  productScanned(data: any){
    console.log('imprimiendo desde el padre data del producto')
    console.log(data)
  }

  loteTyped(data: any){
    console.log('imprimiendo desde el padre data del proveedor y lote')
    console.log(data)
  }

}
