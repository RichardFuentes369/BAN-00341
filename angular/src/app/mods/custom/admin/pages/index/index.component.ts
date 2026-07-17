import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCustomComponent } from '../../components/menu/menu.component';
import { TablecrudCustomComponent } from '../../components/tablecrud/tablecrud.component';
import { GridcrudCustomComponent } from '../../components/gridcrud/gridcrud.component';
import { KpicardCustomComponent } from '../../components/kpicard/kpicard.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule, // Necesario para @if y @for
    MenuCustomComponent,
    KpicardCustomComponent,
    TablecrudCustomComponent,
    GridcrudCustomComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  
  // Estado independiente para cada componente
  vistas = {
    menu: true,
    kpi: true,
    table: true,
    grid: true
  };

  // Método genérico para alternar cualquier sección
  toggle(seccion: keyof typeof this.vistas) {
    this.vistas[seccion] = !this.vistas[seccion];
  }
}