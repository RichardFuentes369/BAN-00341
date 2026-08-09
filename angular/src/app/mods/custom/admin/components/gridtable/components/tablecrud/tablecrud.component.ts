import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-tablecrud',
  standalone: true,
  imports: [
    CommonModule,
    DataTablesModule,
    TranslateModule,
  ],
  templateUrl: './tablecrud.component.html',
  styleUrl: './tablecrud.component.scss',
})
export class TablecrudCustomComponent implements OnInit {

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

  constructor(private translate: TranslateService, private renderer: Renderer2, private elRef: ElementRef) { }

  title: string = 'Registros';
  idsSeleccionados: number[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  columnas = [
    { title: 'ID', data: 'id' },
    { title: 'Nombre', data: 'nombre' },
  ];
  datos = [
    { id: 1, nombre: 'Producto A', descripcion: 'Descripción A' },
    { id: 2, nombre: 'Producto B', descripcion: 'Descripción B' },
    { id: 3, nombre: 'Producto C', descripcion: 'Descripción C' },
    { id: 4, nombre: 'Producto D', descripcion: 'Descripción D' },
    { id: 5, nombre: 'Producto E', descripcion: 'Descripción E' }
  ];

  dtOptions: Config = {};

  ngOnInit(): void {
    this.aplicarEstilosVisuales();

    this.themeListener = (event: CustomEvent) => {
      if (event.detail) {
        this.theme = event.detail;
        this.aplicarEstilosVisuales();
      }
    };

    window.addEventListener('themeChanged', this.themeListener as EventListener);



    this.dtOptions = {
      paging: true,
      ordering: false,
      destroy: true,
      processing: true,
      searching: false,
      serverSide: false,
      autoWidth: false,
      scrollX: true,
      scrollY: '',
      scrollCollapse: false,
      lengthMenu: [5, 10, 20, 30, 40, 50, 100],
      pageLength: this.dtOptions.pageLength || 5,
      dom: "<'row mt-3 mb-1'<'col-12 d-flex justify-content-center align-items-center custom-length-wrapper'l>>" +
        "<'row'<'col-12'rt>>" +
        "<'row mt-4'<'col-md-5'i><'col-md-7 d-flex justify-content-end'p>>",
      language: {
        "processing": `${this.translate.instant('global-tablecrud.WORD_PROCESSING')}...`,
        "lengthMenu": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOW')} _MENU_ ${this.translate.instant('global-tablecrud.TABLE_INFO_RECORDS')}`,
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": `${this.translate.instant('global-tablecrud.TABLE_INFO_NO_INFO')}`,
        "info": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOWING')} _START_ ${this.translate.instant('global-tablecrud.TABLE_INFO_TO')} _END_ ${this.translate.instant('global-tablecrud.TABLE_INFO_OF')} _TOTAL_ ${this.translate.instant('global-tablecrud.TABLE_INFO_ENTRIES')}`,
        "paginate": {
          // "first": `${this.translate.instant('global-tablecrud.TABLE_INFO_FIRST')}`,
          // "last": `${this.translate.instant('global-tablecrud.TABLE_INFO_LAST')}`,
          // "next": `${this.translate.instant('global-tablecrud.TABLE_INFO_NEXT')}`,
          // "previous": `${this.translate.instant('global-tablecrud.TABLE_INFO_PREVIOUS')}`
          "first": `<i class="fa-solid fa-angles-left"></i>`,
          "previous": `<i class="fa-solid fa-angle-left"></i>`,
          "next": `<i class="fa-solid fa-angle-right"></i>`,
          "last": `<i class="fa-solid fa-angles-right"></i>`,
        }
      },
    };
    this.dtTrigger.next(null);
  }

  getValue(item: any, columnData: string) {
    return columnData.split('.').reduce((prev, curr) => prev && prev[curr], item);
  }

  toggleSelection(id: number) {
    const index = this.idsSeleccionados.indexOf(id);
    if (index > -1) {
      this.idsSeleccionados.splice(index, 1); // Deseleccionar
    } else {
      this.idsSeleccionados.push(id); // Seleccionar
    }
  }

  selectionClear() {
    this.idsSeleccionados = [];
  }

  aplicarEstilosVisuales() {
    const temaActual = this.json_custom[this.theme];
    console.log(temaActual)

    if (temaActual) {
      const container = this.elRef.nativeElement.querySelector('.card-preview-container');

      if (container) {
        const estilosCss = `
          --grid_table_crud_custom-title_color: ${temaActual.title_color};
          --grid_table_crud_custom-text_color: ${temaActual.text_color};
          --grid_table_crud_custom-background_color: ${temaActual.background_color};
          --grid_table_crud_custom-head_background: ${temaActual.head_background};
          --grid_table_crud_custom-head_text_color: ${temaActual.head_text_color};
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
