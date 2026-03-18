import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { Config } from 'datatables.net';

declare var $: any;

let ultimaUrlConsultada: string = '';
let haySeleccionados: any[] = [];

@Component({
  selector: 'app-globales-tablecrud',
  standalone: true,
  imports: [
    DataTablesModule,
    TranslateModule
  ],
  templateUrl: './tablecrud.component.html',
  styleUrl: './tablecrud.component.scss',
})
export class TablecrudComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() campoFiltro: boolean = false;
  @Input() endPoint: string = '';
  @Input() complementoEndPoint: string = '';
  @Input() filters: string = '';
  @Input() columnas: any[] = [];
  @Input() permisosAcciones: any[] = [];

  @ViewChild(DataTableDirective, { static: false }) datatableElement!: DataTableDirective;

  responsive = "table-responsive-xl"
  url = environment.apiUrl;
  idsSeleccionados: any[] = [];
  dtOptions: Config = {};
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

  listar() {
    this.dtOptions = {
      paging: true,
      ordering: false,
      processing: true,
      searching: false,
      serverSide: true,
      scrollY: '', 
      scrollCollapse: false,
      lengthMenu: [5, 10, 20, 30, 40, 50, 100],
      pageLength: 10,
      drawCallback: () => {
        const tableElement = document.querySelector('.table-container');
        if (tableElement) {
          tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
        const page = Math.floor(dataTablesParameters.start / dataTablesParameters.length) + 1;
                
        this.http.get<any[]>(
          `${this.url}${this.endPoint}?page=${page}&limit=${dataTablesParameters.length}&field=id&order=asc${this.filters}${this.complementoEndPoint}&lang=${lang}`
        ).subscribe((post: any) => {
          const recordsTotal = post[0].pagination.totalRecord;
          const data = post[0].result.map((item: any) => {
            item.selection = this.idsSeleccionados.includes(item.id);
            return item;
          });

          callback({
            recordsTotal: recordsTotal,
            recordsFiltered: recordsTotal,
            data: data,
          });

          this.cdr.detectChanges();
        });
      },
      language: {
        "processing": `${this.translate.instant('global-tablecrud.WORD_PROCESSING')}...`,
        "lengthMenu": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOW')} _MENU_ ${this.translate.instant('global-tablecrud.TABLE_INFO_RECORDS')}`,
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": `${this.translate.instant('global-tablecrud.TABLE_INFO_NO_INFO')}`,
        "info": `${this.translate.instant('global-tablecrud.TABLE_INFO_SHOWING')} _START_ ${this.translate.instant('global-tablecrud.TABLE_INFO_TO')} _END_ ${this.translate.instant('global-tablecrud.TABLE_INFO_OF')} _TOTAL_ ${this.translate.instant('global-tablecrud.TABLE_INFO_ENTRIES')}`,
        "paginate": {
          "first": `${this.translate.instant('global-tablecrud.TABLE_INFO_FIRST')}`,
          "last": `${this.translate.instant('global-tablecrud.TABLE_INFO_LAST')}`,
          "next": `${this.translate.instant('global-tablecrud.TABLE_INFO_NEXT')}`,
          "previous": `${this.translate.instant('global-tablecrud.TABLE_INFO_PREVIOUS')}`
        }
      },
      columns: [
        {
          title: '<input type="checkbox" class="select-all-checkbox" />', 
          data: null,
          defaultContent: '',
          orderable: false,
          className: 'text-center select-checkbox-column',
        },
        ...this.columnas
      ],
      headerCallback: (thead: Node, data: any, start: number, end: number, display: any) => {
        const $headerCheckbox = $(thead).find('.select-all-checkbox');

        this.datatableElement?.dtInstance.then((dtInstance: any) => {
          const currentData = dtInstance.rows({ page: 'current' }).data().toArray();
          if (currentData.length > 0) {
            const allSelected = currentData.every((item: any) => this.idsSeleccionados.includes(item.id));
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
              const id = rowData.id;
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
      rowCallback: (row: Node, data: any, index: number) => {
        const $row = $(row);
        const $checkbox = $row.find('.row-checkbox');

        // 1. Sincronizar estado visual inicial
        const isSelected = this.idsSeleccionados.includes(data.id);
        $row.toggleClass('selected-row', isSelected);
        $checkbox.prop('checked', isSelected);

        // 2. Evento de clic en toda la fila (TDs)
        $row.off('click').on('click', (e: any) => {
          // Si el clic viene directamente del checkbox, no hacemos nada extra 
          // para evitar que se dispare dos veces (el click del checkbox ya cambia su estado)
          if ($(e.target).hasClass('row-checkbox')) {
            e.stopPropagation(); 
          }

          const idIndex = this.idsSeleccionados.indexOf(data.id);
          const estaSeleccionado = idIndex !== -1;

          if (estaSeleccionado) {
            // Deseleccionar
            this.idsSeleccionados.splice(idIndex, 1);
            $row.removeClass('selected-row');
            $checkbox.prop('checked', false);
            $('.select-all-checkbox').prop('checked', false);
          } else {
            // Seleccionar
            this.idsSeleccionados.push(data.id);
            $row.addClass('selected-row');
            $checkbox.prop('checked', true);
            
            // Verificar si todos en la página están marcados para activar el checkbox del header
            this.datatableElement.dtInstance.then((dtInstance: any) => {
              const pageData = dtInstance.rows({ page: 'current' }).data().toArray();
              const allChecked = pageData.every((item: any) => this.idsSeleccionados.includes(item.id));
              $('.select-all-checkbox').prop('checked', allChecked);
            });
          }

          this.cdr.detectChanges();
        });

        return row;
      }
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