import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ProductosService } from './service/productos.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CARGAR_PRODUCT_COMPONENT, CREAR_PRODUCT_COMPONENT, EDITAR_PRODUCT_COMPONENT, FILTRO_PRODUCT_COMPONENT, MOD_CATEGORY_PAGE_BRAND, MOD_CATEGORY_PAGE_EXTENT, REPORT_PRODUCT_COMPONENT, VER_PRODUCT_COMPONENT } from '@mod/catalog/const/catalog.const';
import Swal from 'sweetalert2';
import { MarcaService } from '../marcas/service/marca.service';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';
import { HttpParams } from '@angular/common/http';
import { ReportComponent } from '@component/globales/report/report.component';
import { MedidaService } from '../medida/service/medida.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    ReportComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    KpicardComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
})
export class ProductosComponent implements OnInit, OnDestroy {

  // construcator
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private permisosService: PermisosService,
    private productosService: ProductosService,
    private brandService: MarcaService,
    private medidaService: MedidaService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-users.BUTTON_SEARCH')
  iconFilter = "fa fa-filter"
  componenteFilter = FILTRO_PRODUCT_COMPONENT
  // fin datos envio al filtro

  // inicio datos envio report
  iconReport = "fa fa-file-download"
  componenteReport = REPORT_PRODUCT_COMPONENT
  // fin datos envio repor

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'product/obtener-productos'
  orderField = 'id'
  order = 'asc'
  idBrand = this.route.snapshot.queryParams?.['id_brand'];
  idExtent = this.route.snapshot.queryParams?.['id_extent'];
  complementoEndPoint = (this.idBrand) ? `&id_marca=${this.idBrand}` : (this.idExtent) ? `&id_medida=${this.idExtent}`: '';
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_ID'),
      data: 'id',
      className: 'text-center align-middle',
      visible: false,
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BRAND'),
      data: 'marca.nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_NAME'),
      data: 'nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
      data: 'codigo_barra',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STOCK'),
      data: 'stock_minimo',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STATUS'),
      data: 'estado',
      className: 'text-center align-middle',
      width: '50px',
      render: (data: any, type: any) => {
        if (type === 'display') {
          const statusText = data
            ? this.translate.instant('mod-users.WORD_ACTIVED')
            : this.translate.instant('mod-users.WORD_INACTIVED');

          const dotClass = data ? 'dot-green' : 'dot-gray';

          return `
            <span class="custom-tooltip tooltip-bottom" data-title="${statusText}">
              <span class="status-dot ${dotClass}"></span>
            </span>
          `;
        }
        return data;
      }
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_UNIT_OF_MEASUREMENT'),
      data: 'medida.nombre',
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
  buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  img_user_actived = "assets/images/img_admin.png"
  titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
  titleTotalProducts = this.translate.instant('mod-catalog.PRODUCT.CARD_TOTAL_PRODUCTS_TITLE')
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

    const permiso_modulo = await this.permisosService.permisoPage(0, 'catalogo', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(22, 'productos', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    if (this.route.snapshot.queryParams?.['id_brand']) {
      try {
        const existBrand = await this.brandService.getDataBrand(this.route.snapshot.queryParams?.['id_brand']);
      } catch (error) {
        this.router.navigate([MOD_CATEGORY_PAGE_BRAND]);
      }
    }

    if (this.route.snapshot.queryParams?.['id_extent']) {
      try {
        const existExtent = await this.medidaService.getDataExtent(this.route.snapshot.queryParams?.['id_extent']);
      } catch (error) {
        this.router.navigate([MOD_CATEGORY_PAGE_EXTENT]);
      }
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'productos')
    this.permisos = permisos.data
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('stock_minimo')
    sessionStorage.removeItem('unidad_medida')

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

  // metodos Componente
  listar() {
    this.columnas = [
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_ID'),
        data: 'id',
        className: 'text-center align-middle',
        visible: false,
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BRAND'),
        data: 'marca.nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_NAME'),
        data: 'nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
        data: 'codigo_barra',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STOCK'),
        data: 'stock_minimo',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STATUS'),
        data: 'estado',
        className: 'text-center align-middle',
        width: '50px',
        render: (data: any, type: any) => {
          if (type === 'display') {
            const statusText = data
              ? this.translate.instant('mod-users.WORD_ACTIVED')
              : this.translate.instant('mod-users.WORD_INACTIVED');

            const dotClass = data ? 'dot-green' : 'dot-gray';

            return `
                <span class="custom-tooltip tooltip-bottom" data-title="${statusText}">
                  <span class="status-dot ${dotClass}"></span>
                </span>
              `;
          }
          return data;
        }
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_UNIT_OF_MEASUREMENT'),
        data: 'medida.nombre',
        className: 'text-center align-middle'
      },
    ]
  }

  // metodos Componente
  cambiarTextos() {
    this.titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
    this.titleTotalProducts = this.translate.instant('mod-catalog.PRODUCT.CARD_TOTAL_PRODUCTS_TITLE')
  }

  crearData(_id: string) {
    this.tamano = "xl"
    this.scrollable = true
    this.title = this.translate.instant('mod-catalog.PRODUCT.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-catalog.PRODUCT.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_PRODUCT_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  cargarData(_id: string) {
    this.title = this.translate.instant('mod-catalog.PRODUCT.UPLOAD_TITLE')
    this.subtitle = this.translate.instant('mod-catalog.PRODUCT.UPLOAD_SUBTITLE')
    this.tamano = "xl"
    this.scrollable = false
    this.save = true
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CARGAR_PRODUCT_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      this.router.navigate([], {
        queryParams: { id_brand: this.route.snapshot.queryParams?.['id_brand'], id_extent: this.route.snapshot.queryParams?.['id_extent'], id_product: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData(_id: string) {
    this.title = this.translate.instant('mod-catalog.PRODUCT.SEE_TITLE')
    const response = await this.productosService.getDataProduct(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.PRODUCT.SEE_SUBTITLE', { "product_name": nombre }).subscribe((res: string) => { this.subtitle = res });
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_PRODUCT_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      this.router.navigate([], {
        queryParams: { id_brand: this.route.snapshot.queryParams?.['id_brand'], id_extent: this.route.snapshot.queryParams?.['id_extent'], id_product: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData(_id: string) {
    this.title = this.translate.instant('mod-catalog.PRODUCT.EDIT_TITLE')
    const response = await this.productosService.getDataProduct(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.PRODUCT.EDIT_SUBTITLE', { "product_name": nombre }).subscribe((res: string) => { this.subtitle = res });
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_PRODUCT_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      this.router.navigate([], {
        queryParams: { id_brand: this.route.snapshot.queryParams?.['id_brand'], id_extent: this.route.snapshot.queryParams?.['id_extent'], id_product: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData(_id: string[]) {
    const response = await this.productosService.getDataProduct(_id[0])
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    const name_user = (_id.length === 1) ? nombre : "(" + _id.length + ")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'

    this.translate.get('mod-catalog.PRODUCT.SWAL_ARE_YOU_SURE_DELETE', { "art_the": count_users, "plural": plural, "product_name": name_user }).subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-catalog.SWAL_WARNING_REVERSE_CHANGE'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-catalog.SWAL_BUTTON_DELETE'),
        cancelButtonText: this.translate.instant('mod-catalog.SWAL_BUTTON_CANCEL')
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            await this.productosService.deleteProduct(_id)
            await this.someInput.reload()
            Swal.fire({
              title: this.translate.instant('mod-catalog.PRODUCT.SWAL_DELETED'),
              text: this.translate.instant('mod-catalog.SWAL_DELETED_RECORD'),
              icon: "success"
            });
          }
        }
      });
    });
  }

  async filtroData() {
    let filtros = await $('.complementoRuta').val();
    const queryParams: any = {
      id_brand: this.idBrand || null,  
      id_extent: this.idExtent || null,  
      search: (filtros) ? filtros : null,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: '',
      replaceUrl: true
    });

    if (typeof filtros === 'string') {
      this.filters = filtros
    }
  }

  async estadoOriginal(){
    const queryParams: any = {
      id_brand: this.idBrand || null,  
      id_extent: this.idExtent || null, 
      search: null,
    };
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: '',
      replaceUrl: true
    });

    this.actualizarContadores()
    await this.someInput.reload()
  }

  async refrescarTabla() {
    console.log('actualice')
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

  async actualizarContadores() {
    const data = await this.productosService.obtenerTotale()
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

    this.productosService.descargarReporte(formato, params).subscribe({
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
