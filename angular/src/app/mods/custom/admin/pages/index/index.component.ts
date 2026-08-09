import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCustomComponent } from '../../components/menu/menu.component';
import { TablecrudCustomComponent } from '../../components/tablecrud/tablecrud.component';
import { GridcrudCustomComponent } from '../../components/gridcrud/gridcrud.component';
import { KpicardCustomComponent } from '../../components/kpicard/kpicard.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalCustomComponent } from '../../components/modal/modal.component';
import { SearchCustomComponent } from '../../components/search/search.component';
import { InputSelectCustomComponent } from '../../components/input-select/input-select.component';
import { VarsService } from '@service/globales/vars/vars.service';

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
export class IndexComponent implements OnInit {

  mostratTodo = false;

  constructor(
    private varsService: VarsService
  ) { }

  // Estado independiente para cada componente
  vistas = {
    layoutIndex: false,
    layoutAdmin: false,
    menu: true,
    input_select: false,
    kpi: false,
    table: false,
    grid: false,
    modal: false,
    search: false,
    report: false,
  };

  currentTheme: string = ''
  custom_json_input: any = {};

  async ngOnInit() {
    this.currentTheme = await localStorage.getItem('theme') || 'light';
    const response1 = await this.varsService.obtenerJson('custom_system') as any;
    if (response1) {
      const parsed = JSON.parse(response1.valor);
      this.custom_json_input = {
        light: parsed.light.input,
        dark: parsed.dark.input
      };
    }
  }

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