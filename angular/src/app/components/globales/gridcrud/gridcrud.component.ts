import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
  @Input() title: string = '';
  @Input() perPage: number = 4;
  @Input() campoFiltro: boolean = false;
  @Input() endPoint: string = '';
  @Input() filters: string = '';
  @Input() permisosAcciones: any[] = [];

  data: any[] = [];
  url = environment.apiUrl;
  idsSeleccionados: any[] = [];

  paginaActual: number = 1;
  totalRegistros: number = 0;
  totalPaginas: number = 1;
  desdeConteo: number = 0;
  hastaConteo: number = 0;

  private langSub: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.listar(1);
    (ultimaUrlConsultada !== this.endPoint) ? this.idsSeleccionados = [] : this.idsSeleccionados = [...haySeleccionados];
    
    this.langSub = this.translate.onLangChange.subscribe(() => {
      haySeleccionados = [...this.idsSeleccionados];
    });
  }

  ngAfterViewInit(): void { }

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
  }

  listar(page: number = 1) {
    this.paginaActual = page;
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';

    // Construcción de URL limpia
    const fullUrl = `${this.url}${this.endPoint}?page=${this.paginaActual}&limit=${this.perPage}&field=id&order=asc${this.filters}&lang=${lang}`;

    this.http.get<any[]>(fullUrl).subscribe({
      next: (post) => {
        if (post && post[0] && post[0].pagination) {
          const pagination = post[0].pagination;
          const result = post[0].result || [];

          this.totalRegistros = pagination.totalRecord;
          this.totalPaginas = Math.ceil(this.totalRegistros / this.perPage) || 1;

          // Lógica de conteo corregida
          this.desdeConteo = result.length > 0 ? (this.paginaActual - 1) * this.perPage + 1 : 0;
          this.hastaConteo = Math.min(this.desdeConteo + result.length - 1, this.totalRegistros);

          this.data = result.map((item: any) => ({
            ...item,
            selection: this.idsSeleccionados.includes(item.id)
          }));
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar datos:', err);
      }
    });
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.listar(nuevaPagina);
    }
  }

  onPerPageChange() {
    this.listar(1);
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
    this.limpiarSeleccion();
    this.listar(1);
  }

  limpiarSeleccion() {
    this.idsSeleccionados = [];
    this.cdr.detectChanges();
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  // Outputs
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
      this.asignar.emit({ id: this.idsSeleccionados[0], ctrlKey: event.ctrlKey || event.metaKey });
    }
  }
  selectionClear() { this.limpiarSeleccion(); }
}