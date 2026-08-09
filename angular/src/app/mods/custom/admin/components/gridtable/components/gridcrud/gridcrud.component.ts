import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-gridcrud',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './gridcrud.component.html',
  styleUrl: './gridcrud.component.scss',
})
export class GridcrudCustomComponent implements OnInit {

  @Input() theme: string = ''
  private _jsonCustomData: any;
  @Input()
  set json_custom(value: any) {
    this._jsonCustomData = value;
    this.aplicarEstilosVisuales();
  }
  get json_custom(): any {
    return this._jsonCustomData;
  }



  private themeListener!: (event: any) => void;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  title: string = 'Registros';
  idsSeleccionados: number[] = [];

  // Datos estáticos definidos aquí mismo
  datos = [
    { id: 1, nombre: 'Elemento A', descripcion: 'Descripción A' },
    { id: 2, nombre: 'Elemento B', descripcion: 'Descripción B' },
  ];

  ngOnInit() {
    this.aplicarEstilosVisuales();

    this.themeListener = (event: CustomEvent) => {
      if (event.detail) {
        this.theme = event.detail;
        this.aplicarEstilosVisuales();
      }
    };

    window.addEventListener('themeChanged', this.themeListener as EventListener);
  }

  getValue(item: any, columnData: string) {
    return columnData.split('.').reduce((prev, curr) => prev && prev[curr], item);
  }

  toggleSelection(id: number) {
    const index = this.idsSeleccionados.indexOf(id);
    if (index > -1) {
      this.idsSeleccionados.splice(index, 1); 
    } else {
      this.idsSeleccionados.push(id); 
    }
  }

  selectionClear() {
    this.idsSeleccionados = [];
  }


  aplicarEstilosVisuales() {
    const temaActual = this.json_custom[this.theme];

    if (temaActual) {
      const container = this.elRef.nativeElement.querySelector('.card-preview-container');

      if (container) {
        const estilosCss = `
          --grid_table_crud_custom-title_color: ${temaActual.title_color};
          --grid_table_crud_custom-text_color: ${temaActual.text_color};
          --grid_table_crud_custom-background_color: ${temaActual.background_color};
          --grid_table_crud_custom-head_background: ${temaActual.head_background};
          --grid_table_crud_custom-row_text_color: ${temaActual.row_text_color};
          --grid_table_crud_custom-row_text_select: ${temaActual.row_text_select};
          --grid_table_crud_custom-row_select: ${temaActual.row_select};
          --grid_table_crud_custom-button_group_disabled: ${temaActual.button_group_disabled};
          --grid_table_crud_custom-button_cargar_excel: ${temaActual.button_cargar_excel};
          --grid_table_crud_custom-button_crear: ${temaActual.button_crear};
          --grid_table_crud_custom-button_ver: ${temaActual.button_ver};
          --grid_table_crud_custom-button_editar: ${temaActual.button_editar};
          --grid_table_crud_custom-button_estado_usuario: ${temaActual.button_estado_usuario};
          --grid_table_crud_custom-button_eliminar_individual: ${temaActual.button_eliminar_individual};
          --grid_table_crud_custom-button_eliminar_multiple: ${temaActual.button_eliminar_multiple};
          --grid_table_crud_custom-button_asignar_permisos: ${temaActual.button_asignar_permisos};
          --grid_table_crud_custom-button_asignar_productos: ${temaActual.button_asignar_productos};
          --grid_table_crud_custom-button_limpiar: ${temaActual.button_limpiar};
        `;
        this.renderer.setProperty(container, 'style', estilosCss);
      }
    }
  }
}