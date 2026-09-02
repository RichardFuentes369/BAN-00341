import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { VentaService } from './service/venta.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { HttpParams } from '@angular/common/http';
import { VER_SALE_COMPONENT } from '@mod/sale_and_return/const/sale_and_return.const';

@Component({
  selector: 'app-sold',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
  ],
  templateUrl: './sold.component.html',
  styleUrl: './sold.component.scss',
})
export class SoldComponent implements OnInit, OnDestroy {

  // construcator
  constructor(
    private router: Router,
    private userService: AuthService,
    private route: ActivatedRoute,
    private mosuloService: ModulosService,
    private permisosService: PermisosService,
    private ventaService: VentaService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-users.BUTTON_SEARCH')
  iconFilter = "fa fa-filter"
  componenteFilter = ''
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'sales/obtener-registro-ventas'
  orderField = 'id'
  order = 'desc'

  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-salereturn.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-salereturn.COLUMN_INVOICE'),
      data: 'nro_factura',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-salereturn.COLUMN_DATE_SALE'),
      data: 'fecha_venta',
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
    }
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

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

  titlePage = this.translate.instant('mod-users.TABLE_TITLE')

  cargarIdioma = true;

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0, 'ventas_y_devoluciones', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(127, 'ventas', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'ventas')
    this.permisos = permisos.data;
    this.permisosAcciones = this.permisos;

    // sessionStorage.removeItem('email')
    // sessionStorage.removeItem('firstName')
    // sessionStorage.removeItem('lastName')
    // sessionStorage.removeItem('isActive')

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

  // metodos Componente
  listar() {
    this.columnas = [
      {
        title: this.translate.instant('mod-salereturn.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-salereturn.COLUMN_INVOICE'),
        data: 'nro_factura',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-salereturn.COLUMN_DATE_SALE'),
        data: 'fecha_venta',
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
      }
    ]
  }

  cambiarTextos() {
    this.titlePage = this.translate.instant('mod-users.TABLE_TITLE')
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  async verData(_id: string) {
    this.title = this.translate.instant('mod-salereturn.SEE_TITLE')
    const response = await this.ventaService.getDataSold(_id)
    const { nro_factura } = response.data || { nro_factura: '*******' }
    this.translate.get('mod-salereturn.SEE_SUBTITLE', { "nro_invoice": nro_factura }).subscribe((res: string) => { this.subtitle = res });
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_SALE_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      this.router.navigate([], { queryParams: { id_sale: _id } });
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

  someInput!: TablecrudComponent
  async refrescarTabla() {
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }
}
