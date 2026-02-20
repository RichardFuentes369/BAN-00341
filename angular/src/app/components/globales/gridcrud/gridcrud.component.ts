import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { Config } from 'datatables.net';
import { FormsModule } from '@angular/forms';

let ultimaUrlConsultada: string = '';
let haySeleccionados: any[] = [];

@Component({
  selector: 'app-globales-gridcrud',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule
  ],
  templateUrl: './gridcrud.component.html',
  styleUrl: './gridcrud.component.scss',
})
export class GridcrudComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() page: number = 1;
  @Input() perPage: number = 10;
  @Input() campoFiltro: boolean = false;
  @Input() endPoint: string = '';
  @Input() filters: string = '';
  @Input() permisosAcciones: any[] = [];

  data: any[] = []
  url = environment.apiUrl;
  idsSeleccionados: any[] = [];

  paginaActual: number = 1;
  totalRegistros: number = 20;
  totalPaginas: number = 20;
  desdeConteo: number = 0;
  hastaConteo: number = 0;

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
    });
  }

  ngAfterViewInit(): void {
  }

  onPerPageChange() {
    this.paginaActual = 1; 
    this.listar(this.paginaActual);
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
  }

  listar(page: number = 1) {
    this.page = page;

    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';

    this.http.get<any[]>(
      `${this.url}${this.endPoint}?page=${this.page}&limit=${this.perPage}&field=id&order=asc${this.filters}&lang=${lang}`
    ).subscribe({
      next: (post) => {
        const recordsTotal = post[0].pagination.totalRecord;

        this.desdeConteo = ((page - 1) * this.perPage) + 1;
        this.hastaConteo = this.desdeConteo + Math.max(0, post[0].result.length - 1);

        this.totalRegistros = recordsTotal;
        this.totalPaginas = Math.ceil(recordsTotal / this.perPage);

        this.data = post[0].result.map((item: any) => {
          return {
            ...item,
            selection: this.idsSeleccionados.includes(item.id)
          };
        });
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar datos:', err);
      }
    });
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.listar(nuevaPagina);
    }
  }

  toggleSelection(id: any) {
    const index = this.idsSeleccionados.indexOf(id);
    if (index > -1) {
      this.idsSeleccionados.splice(index, 1);
    } else {
      this.idsSeleccionados.push(id);
    }
    this.cdr.detectChanges();
  }

  reload() {
    this.limpiarSeleccion()
    this.paginaActual = 1
    this.listar()
  }

  limpiarSeleccion() {
    this.idsSeleccionados = [];
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  // Outputs y métodos Emitters (abreviados para el ejemplo)
  @Output() verItem = new EventEmitter<string>();
  @Output() crearNuevoItem = new EventEmitter<string>();
  @Output() editarItem = new EventEmitter<string>();
  @Output() eliminarItem = new EventEmitter<string[]>();
  @Output() activarItem = new EventEmitter<string[]>();
  @Output() asignar = new EventEmitter<{ id: string, ctrlKey: boolean }>();

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
