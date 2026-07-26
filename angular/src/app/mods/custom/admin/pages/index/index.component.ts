import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCustomComponent } from '../../components/menu/menu.component';
import { TablecrudCustomComponent } from '../../components/tablecrud/tablecrud.component';
import { GridcrudCustomComponent } from '../../components/gridcrud/gridcrud.component';
import { KpicardCustomComponent } from '../../components/kpicard/kpicard.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalCustomComponent } from '../../components/modal/modal.component';
import { SearchCustomComponent } from '../../components/search/search.component';
import { InputSelectCustomComponent } from '../../components/input-select/input-select.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule, // Necesario para @if y @for
    InputSelectCustomComponent,
    TranslateModule,
    MenuCustomComponent,
    KpicardCustomComponent,
    TablecrudCustomComponent,
    GridcrudCustomComponent,
    ModalCustomComponent,
    SearchCustomComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {

  mostratTodo = false;

  // Estado independiente para cada componente
  vistas = {
    layoutIndex: false,
    layoutAdmin: false,
    input_select: false,
    menu: false,
    kpi: false,
    table: false,
    grid: false,
    modal: false,
    search: false,
    report: false,
  };

  // Método genérico para alternar cualquier sección
  toggle(seccion: keyof typeof this.vistas) {
    this.vistas[seccion] = !this.vistas[seccion];
  }

  toggleAll() {
    this.mostratTodo = !this.mostratTodo
    console.log(this.mostratTodo)

    this.vistas = Object.fromEntries(
      Object.keys(this.vistas).map(key => [key, this.mostratTodo])
    ) as typeof this.vistas;
  }
}