import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertasService } from '../../service/alertas.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { SearchComponent } from '@component/globales/search/search.component';
import { ReportComponent } from '@component/globales/report/report.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { FILTRO_ALERTS_V_COMPONENT, REPORT_ALERT_VENCIMIENTO_COMPONENT, VER_ALERTS_V_COMPONENT } from '@mod/alerts/const/alerts.const';
import { HttpParams } from '@angular/common/http';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';

@Component({
  selector: 'app-vencimiento',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SearchComponent,
    ReportComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent
  ],
  templateUrl: './vencimiento.component.html',
  styleUrl: './vencimiento.component.scss',
})
export class VencimientoComponent implements OnInit {

  // construcator
  constructor(
    private router: Router,
    private userService: AuthService,
    private route: ActivatedRoute,
    private permisosService: PermisosService,
    private alertasService: AlertasService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-users.BUTTON_SEARCH')
  iconFilter = "fa fa-filter"
  componenteFilter = FILTRO_ALERTS_V_COMPONENT
  // fin datos envio al filtro

  // inicio datos envio report
  iconReport = "fa fa-file-download"
  componenteReport = REPORT_ALERT_VENCIMIENTO_COMPONENT
  // fin datos envio repor


  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = `alert-expiration/reporte-stock-vencimiento?`
  orderField = 'dias_restantes'
  order = 'asc'
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-warehouse.COLUMN_BATCH'),
      data: 'lote',
      visible: true,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
      data: 'codigo_barra',
      visible: true,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.WORD_PRODUCT'),
      data: 'nombre_producto',
      visible: true,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.WORD_DAYS_REMAINING'),
      data: 'dias_restantes',
      visible: true,
      className: 'text-center align-middle',
      render: (data: any) => {
        if (data === "**********") return '';
        if (data) return data;
      }
    },
    {
      title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
      data: 'estado_alerta',
      visible: true,
      className: 'text-center align-middle'
    },
    // {
    //   title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_COMPRADA'),
    //   data: 'cantidad_comprada',
    //   className: 'text-center align-middle'
    // },
    // {
    //   title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_VENDIDA'),
    //   data: 'cantidad_vendida',
    //   className: 'text-center align-middle'
    // },
    // {
    //   title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
    //   data: 'estado',
    //   className: 'text-center align-middle'
    // },
    // {
    //   title: this.translate.instant('mod-catalog.SUPPLIER.WORD_SUPPLIER'),
    //   data: 'nombre_proveedor',
    //   visible: true,
    //   className: 'text-center align-middle'
    // },
    // {
    //   title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_BODEGA'),
    //   data: 'cantidad_en_bodega',
    //   className: 'text-center align-middle'
    // },
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  titlePage = this.translate.instant('mod-users.TABLE_TITLE')

  // inicio datos envio al modal
  tamano = ""
  scrollable = false
  title = ""
  subtitle = ""
  save = true
  buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  cargarIdioma = true;

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0, 'alertas', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(91, 'alerta_caducidad', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'alerta_caducidad')
    this.permisos = permisos.data;
    this.permisosAcciones = this.permisos;

    // await this.actualizarContadores()

    this.route.queryParams.subscribe(params => {
      const valorSearch = params['search'];
      if (valorSearch) {
        this.filters = valorSearch;
      } else {
        this.filters = '';
      }
    });

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(50).subscribe(() => {
        this.listar();
        //     this.actualizarContadores();
        this.cambiarTextos();
        this.cargarIdioma = true;
      });
    });
  }

  // metodos Componente
  listar() {
    this.columnas = [
      {
        title: this.translate.instant('mod-warehouse.COLUMN_BATCH'),
        data: 'lote',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
        data: 'codigo_barra',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.WORD_PRODUCT'),
        data: 'nombre_producto',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.WORD_DAYS_REMAINING'),
        data: 'dias_restantes',
        visible: true,
        className: 'text-center align-middle',
        render: (data: any) => {
          if (data === "**********") return '';
          if (data) return data;
        }
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
        data: 'estado_alerta',
        visible: true,
        className: 'text-center align-middle'
      },
      // {
      //   title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_COMPRADA'),
      //   data: 'cantidad_comprada',
      //   className: 'text-center align-middle'
      // },
      // {
      //   title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_VENDIDA'),
      //   data: 'cantidad_vendida',
      //   className: 'text-center align-middle'
      // },
      // {
      //   title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
      //   data: 'estado',
      //   className: 'text-center align-middle'
      // },
      // {
      //   title: this.translate.instant('mod-catalog.SUPPLIER.WORD_SUPPLIER'),
      //   data: 'nombre_proveedor',
      //   visible: true,
      //   className: 'text-center align-middle'
      // },
      // {
      //   title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_BODEGA'),
      //   data: 'cantidad_en_bodega',
      //   className: 'text-center align-middle'
      // },
    ]
  }

  cambiarTextos() {
    this.titlePage = this.translate.instant('mod-users.TABLE_TITLE')
    // this.titleTotalUsers = this.translate.instant('mod-users.CARD_TOTAL_ADMIN_TITLE')
    // this.titleTotalPermission = this.translate.instant('mod-users.CARD_TOTAL_PERMISSIONS_TITLE')
    // this.titleTotalActivedUsers = this.translate.instant('mod-users.CARD_TOTAL_ACTIVED_USERS')
    // this.titleTotalSuspendedUsers = this.translate.instant('mod-users.CARD_TOTAL_SUSPENDED_USERS')
  }

  async verDataLazy(filaSeleccionada: string) {
      
    sessionStorage.setItem('rowSelectedLazy', JSON.stringify(filaSeleccionada))
    
    this.title = this.translate.instant('mod-alerts.SEE_TITLE')
    this.translate.get('mod-alerts.SEE_SUBTITLE').subscribe((res: string) => { this.subtitle = res });
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = 'VerAlertaVComponent'

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async filtroData() {
    let filtros = $('.complementoRuta').val()
    this.router.navigate([], { queryParams: { search: (filtros) ? filtros : null }, });
    if (typeof filtros === 'string') {
      this.filters = filtros
    }
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
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

    this.alertasService.descargarReporte('alert-expiration', formato, params).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = formato === 'excel' ? 'xlsx' : 'csv';
        a.download = `reporte_lotes_${new Date().getTime()}.${extension}`;
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
