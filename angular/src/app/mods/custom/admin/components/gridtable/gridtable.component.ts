import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
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
export class GridtableCustomComponent {

  @Input() theme: string = '';

  private themeListener!: (event: any) => void;

  _jsonGridTableCrudData: any = {};

  // Nuevo Output para notificar al padre en tiempo real
  @Output() jsonGridTableChanges = new EventEmitter<any>();

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
          title_color: value.light?.title_color || '#3B3939',
          text_color: value.light?.text_color || '#948F8F',
          background_color: value.light?.background_color || '#FFFFFF',
          head_background: value.light?.head_background || '#0a18f5',
          head_text_color: value.light?.head_text_color || '#FFFFFF',
          row_text_color: value.light?.row_text_color || '#000000',
          row_text_select: value.light?.row_text_select || '#FFFFFF',
          row_select: value.light?.row_select || '#B9BDAE',
          button_group_disabled: value.light?.button_group_disabled || '#BEBFC2',
          button_cargar_excel: value.light?.button_cargar_excel || '#10B981',
          button_crear: value.light?.button_crear || '#059669',
          button_ver: value.light?.button_ver || '#0A18F5',
          button_editar: value.light?.button_editar || '#3B82F6',
          button_estado_usuario: value.light?.button_estado_usuario || '#F59E0B',
          button_eliminar_individual: value.light?.button_eliminar_individual || '#EF4444',
          button_eliminar_multiple: value.light?.button_eliminar_multiple || '#B91C1C',
          button_asignar_permisos: value.light?.button_asignar_permisos || '#E8E417',
          button_asignar_productos: value.light?.button_asignar_productos || '#6D28D9',
          button_limpiar: value.light?.button_limpiar || '#6B7280',
        },
        dark: {
          title_color: value.dark?.title_color || '#FFFFFF',
          text_color: value.dark?.text_color || '#FFFFFF',
          background_color: value.dark?.background_color || '#2B2A2A',
          head_background: value.dark?.head_background || '#111827',
          head_text_color: value.dark?.head_text_color || '#FFFFFF',
          row_text_color: value.dark?.row_text_color || '#FFFFFF',
          row_text_select: value.dark?.row_text_select || '#FFFFFF',
          row_select: value.dark?.row_select || '#1e3a8a',
          button_group_disabled: value.dark?.button_group_disabled || '#BEBFC2',
          button_cargar_excel: value.dark?.button_cargar_excel || '#065F46',
          button_crear: value.dark?.button_crear || '#047857',
          button_ver: value.dark?.button_ver || '#4338CA',
          button_editar: value.dark?.button_editar || '#2563EB',
          button_estado_usuario: value.dark?.button_estado_usuario || '#D97706',
          button_eliminar_individual: value.dark?.button_eliminar_individual || '#DC2626',
          button_eliminar_multiple: value.dark?.button_eliminar_multiple || '#991B1B',
          button_asignar_permisos: value.dark?.button_asignar_permisos || '#CA8A04',
          button_asignar_productos: value.dark?.button_asignar_productos || '#7C3AED',
          button_limpiar: value.dark?.button_limpiar || '#4B5563',
        }
      };
    }
  }

  get json_grid_table(): any {
    return this._jsonGridTableCrudData;
  }

  refreshData() {
    this._jsonGridTableCrudData = JSON.parse(JSON.stringify(this._jsonGridTableCrudData));
    // Emitir los cambios de la tabla/grid al componente padre
    this.jsonGridTableChanges.emit(this._jsonGridTableCrudData);
  }
}