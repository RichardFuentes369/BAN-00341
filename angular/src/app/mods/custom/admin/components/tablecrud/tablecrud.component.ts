import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private translate: TranslateService,
  ) { }

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
}
