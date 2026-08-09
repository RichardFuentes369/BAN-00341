import { Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GridcrudCustomComponent } from './components/gridcrud/gridcrud.component';
import { TablecrudCustomComponent } from './components/tablecrud/tablecrud.component';

@Component({
  selector: 'app-custom-gridtable',
  standalone: true,
  imports: [TranslateModule, FormsModule, GridcrudCustomComponent, TablecrudCustomComponent],
  templateUrl: './gridtable.component.html',
  styleUrl: './gridtable.component.scss',
})
export class GridtableCustomComponent{

  @Input() theme: string = ''

  private themeListener!: (event: any) => void;

  _jsonGridTableCrudData: any = {};

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    this.themeListener = (event: CustomEvent) => {
      if (event.detail) {
        this.theme = event.detail;
      }
    };
    window.addEventListener('themeChanged', this.themeListener as EventListener);
  }

  ngOnDestroy() {
    if (this.themeListener) {
      window.removeEventListener('themeChanged', this.themeListener as EventListener);
    }
  }

  @Input()
  set json_grid_table(value: any) {
    if (value) {
      this._jsonGridTableCrudData = {
        light: {
          title_color: value.light?.title_color  || value.light.bg || '#ffffff',
          text_color: value.light?.text_color  || value.light.bg || '#ffffff',
          background_color: value.light?.background_color  || value.light.bg || '#ffffff',
          head_background: value.light?.head_background  || value.light.bg || '#ffffff',
          head_text_color: value.light?.head_text_color  || value.light.bg || '#ffffff',
          row_text_color: value.light?.row_text_color  || value.light.bg || '#ffffff',
          row_text_select: value.light?.row_text_select  || value.light.bg || '#ffffff',
          row_select: value.light?.row_select  || value.light.bg || '#ffffff',
          button_group_disabled: value.light?.button_group_disabled  || value.light.bg || '#ffffff',
          button_cargar_excel: value.light?.button_cargar_excel  || value.light.bg || '#ffffff',
          button_crear: value.light?.button_crear  || value.light.bg || '#ffffff',
          button_ver: value.light?.button_ver  || value.light.bg || '#ffffff',
          button_editar: value.light?.button_editar  || value.light.bg || '#ffffff',
          button_estado_usuario: value.light?.button_estado_usuario  || value.light.bg || '#ffffff',
          button_eliminar_individual: value.light?.button_eliminar_individual  || value.light.bg || '#ffffff',
          button_eliminar_multiple: value.light?.button_eliminar_multiple  || value.light.bg || '#ffffff',
          button_asignar_permisos: value.light?.button_asignar_permisos  || value.light.bg || '#ffffff',
          button_asignar_productos: value.light?.button_asignar_productos  || value.light.bg || '#ffffff',
          button_limpiar: value.light?.button_limpiar  || value.light.bg || '#ffffff',
        },
        dark: {
          title_color: value.dark?.title_color  || value.dark.bg || '#ffffff',
          text_color: value.dark?.text_color  || value.dark.bg || '#ffffff',
          background_color: value.dark?.background_color  || value.dark.bg || '#ffffff',
          head_background: value.dark?.head_background  || value.dark.bg || '#ffffff',
          head_text_color: value.dark?.head_text_color  || value.dark.bg || '#ffffff',
          row_text_color: value.dark?.row_text_color  || value.dark.bg || '#ffffff',
          row_text_select: value.dark?.row_text_select  || value.dark.bg || '#ffffff',
          row_select: value.dark?.row_select  || value.dark.bg || '#ffffff',
          button_group_disabled: value.dark?.button_group_disabled  || value.dark.bg || '#ffffff',
          button_cargar_excel: value.dark?.button_cargar_excel  || value.dark.bg || '#ffffff',
          button_crear: value.dark?.button_crear  || value.dark.bg || '#ffffff',
          button_ver: value.dark?.button_ver  || value.dark.bg || '#ffffff',
          button_editar: value.dark?.button_editar  || value.dark.bg || '#ffffff',
          button_estado_usuario: value.dark?.button_estado_usuario  || value.dark.bg || '#ffffff',
          button_eliminar_individual: value.dark?.button_eliminar_individual  || value.dark.bg || '#ffffff',
          button_eliminar_multiple: value.dark?.button_eliminar_multiple  || value.dark.bg || '#ffffff',
          button_asignar_permisos: value.dark?.button_asignar_permisos  || value.dark.bg || '#ffffff',
          button_asignar_productos: value.dark?.button_asignar_productos  || value.dark.bg || '#ffffff',
          button_limpiar: value.dark?.button_limpiar  || value.dark.bg || '#ffffff',
        }
      };
    }
  }

  get json_grid_table(): any {
    return this._jsonGridTableCrudData;
  }

  refreshData() {
    this._jsonGridTableCrudData = JSON.parse(JSON.stringify(this._jsonGridTableCrudData));
  }
}
