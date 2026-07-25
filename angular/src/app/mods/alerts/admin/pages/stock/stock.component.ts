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
import { FILTRO_ALERTS_S_COMPONENT } from '@mod/alerts/const/alerts.const';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SearchComponent,
    // ReportComponent,
    LoadingComponent,
    TablecrudComponent
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

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = `alert-stock/reporte-stock-bodega?`
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_NAME'),
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
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_NAME'),
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
}
