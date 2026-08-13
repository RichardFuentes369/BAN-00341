import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { MedidaService } from './service/medida.service';
import { Subscription, timer } from 'rxjs';
import { CREAR_MEDIDA_COMPONENT, EDITAR_MEDIDA_COMPONENT, FILTRO_MEDIDA_COMPONENT, MOD_CATEGORY_PAGE_PRODUCT_FOR_BRAND, MOD_CATEGORY_PAGE_PRODUCT_FOR_EXTENT, REPORT_MEDIDA_COMPONENT, VER_MEDIDA_COMPONENT } from '@mod/catalog/const/catalog.const';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import Swal from 'sweetalert2';
import { GridcrudComponent } from '@component/globales/gridcrud/gridcrud.component';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';
import { ReportComponent } from '@component/globales/report/report.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-medida',
  standalone: true,
  imports: [
    TranslateModule,
    GridcrudComponent,
    SearchComponent,
    ReportComponent,
    LoadingComponent,
    ModalBoostrapComponent,
    KpicardComponent
  ],
  templateUrl: './medida.component.html',
  styleUrl: './medida.component.scss',
})
export class MedidaComponent implements OnInit, OnDestroy {

  // construcator
  constructor(
    private router: Router,
    private userService: AuthService,
    private route: ActivatedRoute,
    private permisosService: PermisosService,
    private medidaService: MedidaService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-catalog.BUTTON_SEARCH')
  iconFilter = "fa fa-filter"
  componenteFilter = FILTRO_MEDIDA_COMPONENT
  // fin datos envio al filtro

  // inicio datos envio report
  iconReport = "fa fa-file-download"
  componenteReport = REPORT_MEDIDA_COMPONENT
  // fin datos envio repor

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'extent/obtener-unidades-de-medida'
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.EXTENT.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.EXTENT.COLUMN_EXTENT_NAME'),
      data: 'nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.BRAND.COLUMN_TOTAL_PRODUCTS'),
      data: 'totalProductos',
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
  buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  wordItem = this.translate.instant('mod-catalog.PRODUCT.ASSIGMENT_PRODUCT_TITLE_BREADCRUMB')
  img_user_actived = "assets/images/img_extent.png"
  titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
  titleTotalSuppliers = this.translate.instant('mod-catalog.EXTENT.CARD_TOTAL_EXTENT_TITLE')
  count_total_extent = 0
  // fin datos envio card information

  cargarIdioma = true;
  mostrarCards = true;
  isAnimationDone = false;

  toggleCards() {
    this.mostrarCards = !this.mostrarCards;
    if (!this.mostrarCards) {
      this.isAnimationDone = true;
    } else {
      this.isAnimationDone = false;
    }
  }

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0, 'catalogo', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(22, 'unidad_de_medida', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'unidad_de_medida')
    this.permisos = permisos.data
    // sessionStorage.removeItem('nit')
    // sessionStorage.removeItem('razon_social')
    // sessionStorage.removeItem('correo')


    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(200).subscribe(() => {
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
        title: this.translate.instant('mod-catalog.EXTENT.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.EXTENT.COLUMN_EXTENT_NAME'),
        data: 'nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.BRAND.COLUMN_TOTAL_PRODUCTS'),
        data: 'totalProductos',
        className: 'text-center align-middle'
      },
    ];
  }

  cambiarTextos() {
    this.wordItem = this.translate.instant('mod-catalog.PRODUCT.ASSIGMENT_PRODUCT_TITLE_BREADCRUMB')
    this.titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
    this.titleTotalSuppliers = this.translate.instant('mod-catalog.EXTENT.CARD_TOTAL_EXTENT_TITLE')
  }

  crearData(_id: string) {
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-catalog.EXTENT.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-catalog.EXTENT.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_MEDIDA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData(_id: string) {
    this.title = this.translate.instant('mod-catalog.EXTENT.SEE_TITLE')
    const response = await this.medidaService.getDataExtent(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.EXTENT.EDIT_SUBTITLE', { "extent_name": nombre }).subscribe((res: string) => { this.subtitle = res });
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_MEDIDA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      this.router.navigate([], {
        queryParams: { id_extent: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async rowsCountData(_rowsCount: string) {
    this.count_total_extent = parseInt(_rowsCount)
  }

  async editarData(_id: string) {
    this.title = this.translate.instant('mod-catalog.EXTENT.EDIT_TITLE')
    const response = await this.medidaService.getDataExtent(_id)
    console.log(response)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.EXTENT.EDIT_SUBTITLE', { "extent_name": nombre }).subscribe((res: string) => { this.subtitle = res });
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_MEDIDA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      this.router.navigate([], {
        queryParams: { id_extent: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(GridcrudComponent)
  someInput!: GridcrudComponent
  async eliminarData(_id: string[]) {
    const response = await this.medidaService.getDataExtent(_id[0])
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    const brand_name = (_id.length === 1) ? nombre : "(" + _id.length + ")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'

    this.translate.get('mod-catalog.EXTENT.SWAL_ARE_YOU_SURE_DELETE', { "art_the": count_users, "plural": plural, "extent_name": brand_name }).subscribe((translatedTitle: string) => {
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
            let response = await this.medidaService.deleteExtent(_id)
            await this.someInput.reload()

            if (response.data.status == 200) {
              Swal.fire({
                title: this.translate.instant('mod-catalog.EXTENT.SWAL_DELETED'),
                text: this.translate.instant('mod-catalog.SWAL_DELETED_RECORD'),
                icon: "success"
              });
            }

            if (response.data.status == 404) {
              Swal.fire({
                title: this.translate.instant('mod-catalog.EXTENT.SWAL_DELETED'),
                text: response.data.message,
                icon: "error"
              });
            }
          }
        }
      });
    });
  }

  asignarData(data: { id: string, ctrlKey: boolean }) {
    const url = `${MOD_CATEGORY_PAGE_PRODUCT_FOR_EXTENT}?id_extent=${data.id}`;
    if (data.ctrlKey) {
      window.open(url, '_blank');
    } else {
      this.router.navigate([MOD_CATEGORY_PAGE_PRODUCT_FOR_EXTENT], { queryParams: { id_extent: data.id } });
    }
  }

  async filtroData() {
    let filtros = await $('.complementoRuta').val();
    this.router.navigate([], { queryParams: { search: (filtros) ? filtros : null }, });
    if (typeof filtros === 'string') {
      this.filters = filtros
    }
  }

  async refrescarTabla() {
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
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

    this.medidaService.descargarReporte(formato, params).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = formato === 'excel' ? 'xlsx' : 'csv';
        a.download = `RPT_measurement_${new Date().getTime()}.${extension}`;
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
