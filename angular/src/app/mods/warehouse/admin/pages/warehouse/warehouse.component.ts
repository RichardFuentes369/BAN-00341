import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { BodegaService } from './service/warehouse.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_WAREHOUSE_COMPONENT, EDITAR_WAREHOUSE_COMPONENT, FILTRO_WAREHOUSE_COMPONENT, REPORT_WAREHOUSE_COMPONENT, VER_WAREHOUSE_COMPONENT } from '@mod/warehouse/const/warehouse.const';
import Swal from 'sweetalert2';
import { ReporteTrazabilidadComponent } from './components/reporte-trazabilidad/reporte-trazabilidad.component';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';
import { ReportComponent } from '@component/globales/report/report.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    ReportComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    KpicardComponent,
    ReporteTrazabilidadComponent
  ],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss',
})
export class WarehoseComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private bodegaService :BodegaService,
    private translate: TranslateService
  ) { }
    
  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-warehouse.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_WAREHOUSE_COMPONENT
  // fin datos envio al filtro
  
  // inicio datos envio report
  iconReport = "fa fa-file-download"
  componenteReport = REPORT_WAREHOUSE_COMPONENT
  // fin datos envio repor

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'batch/obtener-registro-lotes'
  orderField = 'id'
  order = 'desc'
  complementoEndPoint = ``
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-warehouse.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BRAND'),
      data: 'id_producto.marca.nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_BATCH'),
      data: 'lote',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_PRODUCT'),
      data: 'id_producto.nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_SUPPLIER'),
      data: 'id_proveedor.razon_social',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_REPORT_DATE'),
      data: 'fecha_entrada',
      className: 'text-center align-middle',
      render: (data: any) => {
        if (!data) return '';
        const date = new Date(Number(data) * 1000); 
        if (isNaN(date.getTime())) {
          return 'Fecha inválida';
        }
        return date.toLocaleDateString('es-CO', { 
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_EXPIRATION_DATE'),
      data: 'fecha_vencimiento',
      className: 'text-center align-middle',
      render: (data: any) => {
        if (!data) return '';
        const date = new Date(Number(data) * 1000); 
        if (isNaN(date.getTime())) {
          return 'Fecha inválida';
        }
        return date.toLocaleDateString('es-CO', { 
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_PURCHASED'),
      data: 'cantidad_comprada',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_SOLD'),
      data: 'cantidad_vendida',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_SHRINKAGE'),
      data: 'mermas',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_IN_STOCK'),
      data: 'cantidad_en_bodega',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_UNIT_OF_MEASUREMENT'),
      data: 'id_producto.medida.nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_STATUS'),
      data: 'estado',
      className: 'text-center align-middle'
    },
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  // inicio datos envio al modal
  tamano = ""
  scrollable = false
  title = ""
  subtitle = ""
  save = true
  buttonSave = this.translate.instant('mod-warehouse.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-warehouse.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-warehouse.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  img_user_actived = "assets/images/img_warehouse.png"
  titlePage = this.translate.instant('mod-warehouse.TABLE_TITLE')
  titleTotalLot = this.translate.instant('mod-warehouse.CARD_TOTAL_LOT_TITLE')
  count_total_products = '0'
  // fin datos envio card information

  cargarIdioma = true;
  mostrarCards = true;
  isAnimationDone = false;

  toggleCards() {
    this.mostrarCards = !this.mostrarCards;
    if (!this.mostrarCards) {
      this.isAnimationDone = true;
    } else {
      this.actualizarContadores()
      this.isAnimationDone = false;
    }
  }

    // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0,'bodega',userData.data.id)

    if (permiso_modulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'bodega')
    this.permisos = permisos.data;
    this.permisosAcciones = this.permisos;
    // sessionStorage.removeItem('nit')
    // sessionStorage.removeItem('razon_social')
    // sessionStorage.removeItem('correo')

    await this.actualizarContadores()

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(200).subscribe(() => {
        this.actualizarContadores()
        this.listar(); 
        this.cambiarTextos(); 
        this.cargarIdioma = true;
      });
    });
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  listar(){
    this.columnas = [
      {
        title: this.translate.instant('mod-warehouse.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BRAND'),
        data: 'id_producto.marca.nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_BATCH'),
        data: 'lote',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_PRODUCT'),
        data: 'id_producto.nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_SUPPLIER'),
        data: 'id_proveedor.razon_social',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_REPORT_DATE'),
        data: 'fecha_entrada',
        className: 'text-center align-middle',
        render: (data: any) => {
          if (!data) return '';
          const date = new Date(Number(data) * 1000); 
          if (isNaN(date.getTime())) {
            return 'Fecha inválida';
          }
          return date.toLocaleDateString('es-CO', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
        }
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_EXPIRATION_DATE'),
        data: 'fecha_vencimiento',
        className: 'text-center align-middle',
        render: (data: any) => {
        if (!data) return '';
          const date = new Date(Number(data) * 1000); 
          if (isNaN(date.getTime())) {
            return 'Fecha inválida';
          }
          return date.toLocaleDateString('es-CO', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
        }
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_PURCHASED'),
        data: 'cantidad_comprada',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_SOLD'),
        data: 'cantidad_vendida',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_SHRINKAGE'),
        data: 'mermas',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_IN_STOCK'),
        data: 'cantidad_en_bodega',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_UNIT_OF_MEASUREMENT'),
        data: 'id_producto.medida.nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_STATUS'),
        data: 'estado',
        className: 'text-center align-middle'
      },
    ];  
  }

  // metodos Componente
  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-warehouse.TABLE_TITLE')
    this.titleTotalLot = this.translate.instant('mod-warehouse.CARD_TOTAL_LOT_TITLE')
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  crearData (_id: string){
    this.tamano = "xl"
    this.scrollable = true
    this.title = this.translate.instant('mod-warehouse.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-warehouse.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-warehouse.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-warehouse.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-warehouse.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_WAREHOUSE_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    this.title = this.translate.instant('mod-warehouse.SEE_TITLE')
    const response = await this.bodegaService.getDataLote(_id)
    const { lote } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-warehouse.SEE_SUBTITLE', { "batch_code": lote }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-warehouse.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-warehouse.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-warehouse.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_WAREHOUSE_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_lote: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    this.title = this.translate.instant('mod-warehouse.EDIT_TITLE')
    const response = await this.bodegaService.getDataLote(_id)
    const { lote } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-warehouse.EDIT_SUBTITLE', { "batch_code": lote }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-warehouse.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-warehouse.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-warehouse.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_WAREHOUSE_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_lote: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData(_id: string[]) {
    const response = await this.bodegaService.getDataLote(_id[0])

    this.translate.get('mod-warehouse.SWAL_ARE_YOU_SURE_DELETE_WAREHOUSE').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-warehouse.SWAL_WARNING_REVERSE_CHANGE'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-warehouse.SWAL_BUTTON_DELETE'),
        cancelButtonText: this.translate.instant('mod-warehouse.SWAL_BUTTON_CANCEL')
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.bodegaService.deleteBodega(_id)
          await this.someInput.reload()
          Swal.fire({
            title: this.translate.instant('mod-catalog.PRODUCT.SWAL_CREATED'),
            text: this.translate.instant('mod-warehouse.SWAL_DELETED_RECORD'),
            icon: "success"
          });
        }
      });
    });
  }

  async filtroData(){
    let filtros = await $('.complementoRuta').val();
    this.router.navigate([], { queryParams: { search: (filtros) ? filtros : null }, });
    if(typeof filtros === 'string'){
      this.filters = filtros
    }
  }

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

  async actualizarContadores (){
    const data = await this.bodegaService.obtenerTotale()
    this.count_total_products = data.data.count_total_products
  }

  reportData(formato: string) {
    const complementoRuta = $(".complementoRuta").val()
    const querySearch = this.route.snapshot.queryParamMap.get('search');

    const compRuta: string = typeof complementoRuta === 'string' ? complementoRuta : '';
    const qSearch: string = querySearch ?? '';

    const configParams = new URLSearchParams(compRuta.replace(/^[&?]/, ''));
    const searchParams = new URLSearchParams(qSearch.replace(/^[&?]/, ''));

    const allKeys = Array.from(new Set([...Array.from(configParams.keys()), ...Array.from(searchParams.keys())]));

    const reporteConfig = allKeys.map(key => {
      return {
        field: key,
        value: searchParams.get(key) || '',
        show: configParams.get(key) === 'true'
      };
    });

    let params = new HttpParams();

    reporteConfig.forEach(item => {
      if (item.value) {
        params = params.append(item.field, item.value);
      }
      if (item.show) {
        params = params.append(item.field, 'true');
      }
    });

    this.bodegaService.descargarReporte(formato, params).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = formato === 'excel' ? 'xlsx' : 'csv';
        a.download = `RPT_warehouse_${extension}_${new Date().getTime()}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el reporte', err);
      }
    });
  }
}
