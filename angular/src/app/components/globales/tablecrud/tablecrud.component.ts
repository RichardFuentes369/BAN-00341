import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { Config } from 'datatables.net';
import { FormsModule } from '@angular/forms';

declare var $: any;

let ultimaUrlConsultada: string = '';
let haySeleccionados: any[] = [];

@Component({
  selector: 'app-globales-tablecrud',
  standalone: true,
  imports: [
    DataTablesModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './tablecrud.component.html',
  styleUrl: './tablecrud.component.scss',
})
export class TablecrudComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() title: string = '';
  @Input() accioneson: boolean = true;
  @Input() campoFiltro: boolean = false;
  @Input() endPoint: string = '';
  @Input() complementoEndPoint: string = '';
  @Input() filters: string = '';
  @Input() columnas: any[] = [];
  @Input() permisosAcciones: any[] = [];
  @Input() habilitarSeleccion: boolean = false;

  @Input() dataMapper?: (response: any) => { data: any[], total: number };

  @ViewChild(DataTableDirective, { static: false }) datatableElement!: DataTableDirective;

  url = environment.apiUrl;
  idsSeleccionados: any[] = [];
  dtOptions: Config & { responsive?: boolean; autoWidth?: boolean } = {};
  dtTrigger: Subject<any> = new Subject<any>();

  private langSub: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.listar();
    (ultimaUrlConsultada != this.endPoint) ? this.idsSeleccionados = [] : this.idsSeleccionados = [...haySeleccionados]
    this.langSub = this.translate.onLangChange.subscribe(() => {
      haySeleccionados = [...this.idsSeleccionados];
      this.recargarIdioma();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.reload();
    }
    if (changes['permisosAcciones']) {
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    if (this.langSub) this.langSub.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  recargarIdioma() {
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      this.listar();
      this.dtTrigger.next(null);
    });
  }

  cambiarLimiteRegistros(event: any) {
    const nuevoLimite = parseInt(event.target.value, 10);

    this.dtOptions.pageLength = nuevoLimite;

    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: any) => {
        dtInstance.page.len(nuevoLimite).draw();
      });
    }
  }

  listar() {
    const columnaSeleccion = {
      title: `
        <div style="display: flex; flex-direction: column; align-items: center; line-height: 1;">
          <input type="checkbox" class="select-all-checkbox" style="transform: scale(0.8); margin: 0;" />
          <span style="font-size: 10px; font-weight: bold; margin-top: 2px;">Id</span>
        </div>
      `,
      data: null,
      orderable: false,
      className: 'text-center select-checkbox-column',
      render: (data: any, type: any, row: any) => {
        const id = row.id;
        if (!id) return '';
        return `<div class="text-center"><small>${id}</small></div>`;
      }
    };

    this.dtOptions = {
      paging: true,
      ordering: false,
      destroy: true,
      processing: true,
      searching: false,
      serverSide: true,
      pagingType: 'full_numbers',
      responsive: true,
      autoWidth: false,
      scrollX: true,
      scrollY: '',
      scrollCollapse: false,
      lengthMenu: [5, 10, 20, 30, 40, 50, 100],
      pageLength: this.dtOptions.pageLength || 5,
      dom: "<'row mt-3 mb-1'<'col-12 d-flex justify-content-center align-items-center custom-length-wrapper'l>>" +
        "<'row'<'col-12'rt>>" +
        "<'row mt-4'<'col-md-5'i><'col-md-7 d-flex justify-content-end'p>>",
      drawCallback: () => {
        const tableElement = document.querySelector('.table-container');
        if (tableElement) {
          tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const styleId = 'dt-pagination-styles';
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;

        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          document.head.appendChild(styleElement);
        }

        const cssRules = `
          /* Estilo base de los botones de paginación */
          .dt-container .dt-paging .dt-paging-button {
            background-color: #f3f4f6 !important;
            border: 1px solid #d1d5db !important;
            border-radius: 26px !important;
            padding: 6px 12px !important;
            margin: 0 3px !important;
            cursor: pointer !important;
            background-image: none !important;
            box-shadow: none !important;
          }

          /* Hover y Focus forzados */
          .dt-container .dt-paging .dt-paging-button:hover:not(.disabled):not(.current),
          .dt-container .dt-paging .dt-paging-button:focus:not(.disabled):not(.current) {
            background-color: color-mix(in srgb, var(--grid_table_crud-head_background) 50%, white) !important;
            color: #fdfeff !important;
            border-color: #9ca3af !important;
            background-image: none !important;
          }

          /* Página actual / activa (Selector con mayor especificidad + hijos) */
          div.dt-container div.dt-paging .dt-paging-button.current,
          div.dt-container div.dt-paging .dt-paging-button.current:hover,
          div.dt-container div.dt-paging .dt-paging-button.current *,
          div.dt-container div.dt-paging .dt-paging-button.current:hover * {
            background-color: var(--grid_table_crud-head_background) !important;
            color: #ffffff !important;
            border-color: var(--grid_table_crud-head_background) !important;
            background-image: none !important;
          }
        `;

        styleElement.innerHTML = cssRules;

        setTimeout(() => {
          const currentButton = document.querySelector('.dt-paging .dt-paging-button.current') as HTMLElement;
          if (currentButton) {
            currentButton.style.setProperty('background-color', 'var(--grid_table_crud-head_background)', 'important');
            currentButton.style.setProperty('color', '#ffffff', 'important');
            currentButton.style.setProperty('border-color', 'var(--grid_table_crud-head_background)', 'important');

            // Forzar también sus hijos si los tiene
            const children = currentButton.querySelectorAll('*');
            children.forEach((child: any) => {
              child.style.setProperty('color', '#ffffff', 'important');
            });
          }
        }, 30);
      },
      ajax: (dataTablesParameters: any, callback) => {
        const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
        const page = Math.floor(dataTablesParameters.start / dataTablesParameters.length) + 1;

        // Mantengo tu estructura de URL original
        const separator = this.endPoint.includes('?') ? '&' : '?';
        const fullUrl = `${this.url}${this.endPoint}${separator}page=${page}&limit=${dataTablesParameters.length}${this.filters}${this.complementoEndPoint}&lang=${lang}`;

        this.http.get<any>(fullUrl).subscribe({
          next: (res: any) => {
            let recordsTotal = 0;
            let rawData = [];

            // --- LÓGICA HÍBRIDA PARA SP Y TABLAS ESTÁNDAR ---

            // Caso 1: Se pasó un mapeador explícito (Recomendado para el Reporte)
            if (this.dataMapper) {
              const mapped = this.dataMapper(res);
              recordsTotal = mapped.total;
              rawData = mapped.data;
            }
            // Caso 2: Es el JSON del SP (Arreglo de arreglos) y no hay mapeador
            else if (Array.isArray(res) && Array.isArray(res[0]) && res[0][0]?.total !== undefined) {
              recordsTotal = res[0][0].total;
              rawData = res[1] || [];
            }
            // Caso 3: Estructura Estándar de tu proyecto (Usuarios)
            else if (res && res[0] && res[0].pagination) {
              recordsTotal = res[0].pagination.totalRecord;
              rawData = res[0].result;
            }
            // Caso 4: Fallback
            else {
              rawData = Array.isArray(res) ? res : [];
              recordsTotal = rawData.length;
            }

            // Procesamiento de selección de filas
            const data = rawData.map((item: any) => {
              // Si no hay 'id' (como en el reporte), usamos 'IDENTIFICADOR' para la lógica de selección
              const uniqueId = item.id || item.IDENTIFICADOR;
              item.selection = this.idsSeleccionados.includes(uniqueId);
              return item;
            });

            callback({
              recordsTotal: recordsTotal,
              recordsFiltered: recordsTotal,
              data: data,
            });

            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error("Error en TableCrud:", err);
            callback({ recordsTotal: 0, recordsFiltered: 0, data: [] });
          }
        });
      },
      language: {
        "processing": `${this.translate.instant('global-tablecrud.WORD_PROCESSING')}...`,
        "lengthMenu": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOW')} _MENU_ ${this.translate.instant('global-tablecrud.TABLE_INFO_RECORDS')}`,
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": `${this.translate.instant('global-tablecrud.TABLE_INFO_NO_INFO')}`,
        "info": `<span style="font-size: 0.85rem;color: var(--grid_table_crud-text_color) !important;">${this.translate.instant('global-tablecrud.TABLE_INFO_SHOWING')} _START_ ${this.translate.instant('global-tablecrud.TABLE_INFO_TO')} _END_ ${this.translate.instant('global-tablecrud.TABLE_INFO_OF')} _TOTAL_ ${this.translate.instant('global-tablecrud.TABLE_INFO_ENTRIES')}</span>`,
        "paginate": {
          "first": `<i class="fa-solid fa-angles-left""></i>`,
          "previous": `<i class="fa-solid fa-angle-left""></i>`,
          "next": `<i class="fa-solid fa-angle-right""></i>`,
          "last": `<i class="fa-solid fa-angles-right""></i>`,
        }
      },
      columns: this.habilitarSeleccion ? [columnaSeleccion, ...this.columnas] : [...this.columnas],
      headerCallback: (thead: Node, data: any, start: number, end: number, display: any) => {
        const $headerCheckbox = $(thead).find('.select-all-checkbox');

        this.datatableElement?.dtInstance.then((dtInstance: any) => {
          const currentData = dtInstance.rows({ page: 'current' }).data().toArray();
          if (currentData.length > 0) {
            const allSelected = currentData.every((item: any) => this.idsSeleccionados.includes(item.id || item.IDENTIFICADOR));
            $headerCheckbox.prop('checked', allSelected);
          }
        });

        $headerCheckbox.off('change').on('change', (e: any) => {
          const isChecked = e.target.checked;
          this.datatableElement.dtInstance.then((dtInstance: any) => {
            const currentRows = dtInstance.rows({ page: 'current' });
            const currentData = currentRows.data();
            const nodes = currentRows.nodes();

            currentData.each((rowData: any, index: number) => {
              const id = rowData.id || rowData.IDENTIFICADOR;
              const idIndex = this.idsSeleccionados.indexOf(id);
              const $row = $(nodes[index]);
              const $rowCheckbox = $row.find('.row-checkbox');

              if (isChecked) {
                if (idIndex === -1) this.idsSeleccionados.push(id);
                $row.addClass('selected-row');
                $rowCheckbox.prop('checked', true);
              } else {
                if (idIndex !== -1) this.idsSeleccionados.splice(idIndex, 1);
                $row.removeClass('selected-row');
                $rowCheckbox.prop('checked', false);
              }
            });
            this.cdr.detectChanges();
          });
        });
      },
      rowCallback: !this.habilitarSeleccion ? undefined : (row: Node, data: any, index: number) => {
        const $row = $(row);
        const $checkbox = $row.find('.row-checkbox');

        // 1. Estado inicial de la fila
        const isSelected = this.idsSeleccionados.includes(data.id || data.IDENTIFICADOR);
        $row.toggleClass('selected-row', isSelected);
        $checkbox.prop('checked', isSelected);

        $row.off('click').on('click', (e: any) => {
          const rowElement = row as HTMLElement;
          const rectRow = rowElement.getBoundingClientRect();
          const y = e.clientY - rectRow.top;

          $row.find('td').each((i: number, tdNode: any) => {
            const td = tdNode as HTMLElement;
            const rectTd = td.getBoundingClientRect();
            const relativeX = e.clientX - rectTd.left;

            td.style.setProperty('--ripple-x', `${relativeX}px`);
            td.style.setProperty('--ripple-y', `${y}px`);

            $(td).addClass('ripple-active');
            setTimeout(() => $(td).removeClass('ripple-active'), 600);
          });

          // --- LÓGICA DE NEGOCIO (SELECCIÓN) ---
          if ($(e.target).hasClass('row-checkbox')) {
            e.stopPropagation();
          }

          const id = data.id || data.IDENTIFICADOR;
          const idIndex = this.idsSeleccionados.indexOf(id);
          const estaSeleccionado = idIndex !== -1;

          if (estaSeleccionado) {
            // Deseleccionar
            this.idsSeleccionados.splice(idIndex, 1);
            $row.removeClass('selected-row');
            $checkbox.prop('checked', false);
            $('.select-all-checkbox').prop('checked', false);
          } else {
            // Seleccionar
            this.idsSeleccionados.push(id);
            $row.addClass('selected-row');
            $checkbox.prop('checked', true);

            this.datatableElement.dtInstance.then((dtInstance: any) => {
              const pageData = dtInstance.rows({ page: 'current' }).data().toArray();
              const allChecked = pageData.every((item: any) =>
                this.idsSeleccionados.includes(item.id || item.IDENTIFICADOR)
              );
              $('.select-all-checkbox').prop('checked', allChecked);
            });
          }

          this.cdr.detectChanges();
        });

        return row;
      },
    };
  }

  reload() {
    this.limpiarSeleccion();
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.ajax.reload(() => {
        this.cdr.detectChanges();
      });
    });
  }

  limpiarSeleccion() {
    this.idsSeleccionados = [];
    $('.tableDatatable tbody tr').removeClass('selected-row');
    $('.row-checkbox').prop('checked', false);
    $('.select-all-checkbox').prop('checked', false);
    this.cdr.detectChanges();
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  @Output() cargarItem = new EventEmitter<string>();
  @Output() verItem = new EventEmitter<string>();
  @Output() crearNuevoItem = new EventEmitter<string>();
  @Output() editarItem = new EventEmitter<string>();
  @Output() eliminarItem = new EventEmitter<string[]>();
  @Output() activarItem = new EventEmitter<string[]>();
  @Output() asignar = new EventEmitter<{ id: string, ctrlKey: boolean }>();

  uploadItem() { if (this.idsSeleccionados.length === 0) this.cargarItem.emit(); }
  newItem() { if (this.idsSeleccionados.length === 0) this.crearNuevoItem.emit(); }
  seeItem() { if (this.idsSeleccionados.length === 1) this.verItem.emit(this.idsSeleccionados[0]); }
  editItem() { if (this.idsSeleccionados.length === 1) this.editarItem.emit(this.idsSeleccionados[0]); }
  deleteItem() { if (this.idsSeleccionados.length > 0) this.eliminarItem.emit(this.idsSeleccionados); }
  activedItem() { if (this.idsSeleccionados.length > 0) this.activarItem.emit(this.idsSeleccionados); }

  assign(event: MouseEvent) {
    if (this.idsSeleccionados.length === 1) {
      this.asignar.emit({
        id: this.idsSeleccionados[0],
        ctrlKey: event.ctrlKey || event.metaKey
      });
    }
  }

  selectionClear() { this.limpiarSeleccion(); }


}