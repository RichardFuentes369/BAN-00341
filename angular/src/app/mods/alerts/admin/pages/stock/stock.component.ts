import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertasService } from '../../service/alertas.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { SearchComponent } from '@component/globales/search/search.component';
import { ReportComponent } from '@component/globales/report/report.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { FILTRO_ALERTS_S_COMPONENT, REPORT_ALERT_STOCK_COMPONENT } from '@mod/alerts/const/alerts.const';
import { HttpParams } from '@angular/common/http';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SearchComponent,
    ReportComponent,
    LoadingComponent,
    TablecrudComponent,
    KpicardComponent
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent implements OnInit {

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
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_ALERTS_S_COMPONENT
  // fin datos envio al filtro

  // inicio datos envio report
  iconReport = "fa fa-file-download"
  componenteReport = REPORT_ALERT_STOCK_COMPONENT
  // fin datos envio repor

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = `alert-stock/reporte-stock-bodega?`
  habilitarSeleccion = false
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
      data: 'codigo_barra',
      visible: true,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_PRODUCT'),
      data: 'nombre',
      visible: true,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STOCK') + ' <br> (' + this.translate.instant('mod-catalog.PRODUCT.LABEL_MINIMUM_QUANTITY') + ')',
      data: 'stock_minimo',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_BODEGA'),
      data: 'total_productos_disponibles',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.WORD_COMMENT'),
      data: 'aviso_stock',
      className: 'text-center align-middle',
    }
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  titlePage = this.translate.instant('mod-users.TABLE_TITLE')

  cargarIdioma = true;

  // inicio datos envio card information
  img_user_actived = "assets/images/img_alert_warehouse.png"
  titleTotalSuppliers = this.translate.instant('mod-warehouse.CARD_TOTAL_LOT_TITLE')
  count_total_stock = 0
  // fin datos envio card information

  mostrarCards = true;
  isAnimationDone = false;

  toggleCards() {
    this.mostrarCards = !this.mostrarCards;
    if (!this.mostrarCards) {
      this.isAnimationDone = true;
    } else {
      // this.actualizarContadores()
      this.isAnimationDone = false;
    }
  }

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0, 'alertas', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(91, 'alerta_stock', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'alerta_stock')
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
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
        data: 'codigo_barra',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.COLUMN_PRODUCT'),
        data: 'nombre',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STOCK') + ' <br> (' + this.translate.instant('mod-catalog.PRODUCT.LABEL_MINIMUM_QUANTITY') + ')',
        data: 'stock_minimo',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_BODEGA'),
        data: 'total_productos_disponibles',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.WORD_COMMENT'),
        data: 'aviso_stock',
        className: 'text-center align-middle',
      }
    ]
  }

  cambiarTextos() {
    this.titlePage = this.translate.instant('mod-users.TABLE_TITLE')
    // this.titleTotalUsers = this.translate.instant('mod-users.CARD_TOTAL_ADMIN_TITLE')
    // this.titleTotalPermission = this.translate.instant('mod-users.CARD_TOTAL_PERMISSIONS_TITLE')
    // this.titleTotalActivedUsers = this.translate.instant('mod-users.CARD_TOTAL_ACTIVED_USERS')
    // this.titleTotalSuspendedUsers = this.translate.instant('mod-users.CARD_TOTAL_SUSPENDED_USERS')
  }

  async filtroData(){
    let filtros = $('.complementoRuta').val()
    this.router.navigate([], { queryParams: { search: (filtros) ? filtros : null }, });
    if(typeof filtros === 'string'){
      this.filters = filtros
    }
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  async rowsCountData(_rowsCount: string) {
    this.count_total_stock = parseInt(_rowsCount)
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

    this.alertasService.descargarReporte('alert-stock', formato, params).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = formato === 'excel' ? 'xlsx' : 'csv';
        a.download = `RPT_warehouse_alert${new Date().getTime()}.${extension}`;
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
