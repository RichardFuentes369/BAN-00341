import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCustomComponent } from '../../components/menu/menu.component';
import { KpicardCustomComponent } from '../../components/kpicard/kpicard.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalCustomComponent } from '../../components/modal/modal.component';
import { InputSelectCustomComponent } from '../../components/input-select/input-select.component';
import { VarsService } from '@service/globales/vars/vars.service';
import { GridtableCustomComponent } from '../../components/gridtable/gridtable.component';
import { TitlePageCustomComponent } from '../../components/title-page/title-page.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    InputSelectCustomComponent,
    TranslateModule,
    MenuCustomComponent,
    KpicardCustomComponent,
    GridtableCustomComponent,
    ModalCustomComponent,
    TitlePageCustomComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {

  mostratTodo = false;
  imgCustom = 'assets/images/img_custom.png';
  
  private rawParsedJson: any = {};

  constructor(
    private varsService: VarsService
  ) { }

  vistas = {
    layoutIndex: false,
    layoutAdmin: false,
    menu: false,
    input_select: false,
    title_page: false,
    kpi: false,
    table_grid: false,
    modal: false,
    search: false,
    report: false,
  };

  currentTheme: string = '';
  custom_json_input: any = {};
  custom_json_kpi: any = {};
  custom_json_menu: any = {};
  custom_json_grid_table: any = {};
  custom_json_title_page: any = {};
  custom_json_modal: any = {};

  async ngOnInit() {
    this.currentTheme = await localStorage.getItem('theme') || 'light';
    const response1 = await this.varsService.obtenerJson('custom_system') as any;
    if (response1) {
      const parsed = JSON.parse(response1.valor);
      this.rawParsedJson = parsed;

      this.custom_json_input = {
        light: parsed.light?.input || {},
        dark: parsed.dark?.input || {}
      };
      this.custom_json_kpi = {
        light: parsed.light?.kpicard || {},
        dark: parsed.dark?.kpicard || {}
      };
      this.custom_json_menu = {
        light: parsed.light?.card_menu || {},
        dark: parsed.dark?.card_menu || {}
      };
      this.custom_json_grid_table = {
        light: parsed.light?.grid_table_crud || {},
        dark: parsed.dark?.grid_table_crud || {}
      };
      this.custom_json_title_page = {
        light: parsed.light?.title_page || {},
        dark: parsed.dark?.title_page || {}
      };
      this.custom_json_modal = {
        light: parsed.light?.modal || {},
        dark: parsed.dark?.modal || {}
      };
    }
  }

  toggle(seccion: keyof typeof this.vistas) {
    this.vistas[seccion] = !this.vistas[seccion];
  }

  toggleAll() {
    this.mostratTodo = !this.mostratTodo;
    this.vistas = Object.fromEntries(
      Object.keys(this.vistas).map(key => [key, this.mostratTodo])
    ) as typeof this.vistas;
  }

  copiarJsonConfiguracion() {
    // Reconstrucción del JSON extrayendo la subpropiedad de cada componente de manera limpia
    const jsonConsolidado = {
      light: {
        ...(this.rawParsedJson.light || {}),
        kpicard: this.custom_json_kpi?.light || {},
        title_page: this.custom_json_title_page?.light || {},
        card_menu: this.custom_json_menu?.light || {},
        grid_table_crud: this.custom_json_grid_table?.light || {},
        input: this.custom_json_input?.light || {},
        modal: this.custom_json_modal?.light || {}
      },
      dark: {
        ...(this.rawParsedJson.dark || {}),
        kpicard: this.custom_json_kpi?.dark || {},
        title_page: this.custom_json_title_page?.dark || {},
        card_menu: this.custom_json_menu?.dark || {},
        grid_table_crud: this.custom_json_grid_table?.dark || {},
        input: this.custom_json_input?.dark || {},
        modal: this.custom_json_modal?.dark || {}
      }
    };

    const jsonString = JSON.stringify(jsonConsolidado, null, 2);

    navigator.clipboard.writeText(jsonString).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Copiado!',
        text: 'JSON de configuración copiado al portapapeles exitosamente.',
        timer: 2000,
        showConfirmButton: false
      });
    }).catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo copiar el JSON. Revisa la consola para más detalles.'
      });
    });
  }
}