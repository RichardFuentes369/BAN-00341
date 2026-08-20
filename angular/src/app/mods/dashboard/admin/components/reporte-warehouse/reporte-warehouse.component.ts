import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-warehouse',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './reporte-warehouse.component.html',
  styleUrl: './reporte-warehouse.component.scss',
})
export class ReporteWarehouseComponent {

  mostrarSeccion = {
    productSeccion: true,
    batchSeccion: true,
    providerSeccion: true,
    registerSeccion: true,
    mermaSeccion: true
  }


  toogleSection(sectionActive: string) {
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
    }
  }

}
