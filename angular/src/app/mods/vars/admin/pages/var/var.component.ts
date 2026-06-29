import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { VarService } from './service/var.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';

@Component({
  selector: 'app-var',
  standalone: true,
  imports: [
    TranslateModule,
    // SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    // ModalBoostrapComponent,
    KpicardComponent,
  ],
  templateUrl: './var.component.html',
  styleUrl: './var.component.scss',
})
export class VarComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private permisosService: PermisosService,
    private varService: VarService,
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
  endPoint = 'var/obtener-vars-var'
  complementoEndPoint = '';
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
      data: 'nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_UNIT_OF_MEASUREMENT'),
      data: 'valor',
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
  titleTotalVar = this.translate.instant('mod-vars.VARS.CARD_TOTAL_VAR_TITLE')
  count_total_var = '0'
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

    const permiso_modulo = await this.permisosService.permisoPage(0, 'variables_sistema', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(95, 'system_var', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'system_var')
    this.permisos = permisos.data
    // sessionStorage.removeItem('nombre')
    // sessionStorage.removeItem('codigo_barra')
    // sessionStorage.removeItem('stock_minimo')
    // sessionStorage.removeItem('unidad_medida')

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
        data: 'nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_UNIT_OF_MEASUREMENT'),
        data: 'valor',
        className: 'text-center align-middle'
      },
    ]
  }

  // metodos Componente
  cambiarTextos() {
    this.titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
    this.titleTotalVar = this.translate.instant('mod-vars.VARS.CARD_TOTAL_VAR_TITLE')
  }

  crearData(_id: string) {
    // this.tamano = "xl"
    // this.scrollable = true
    // this.title = this.translate.instant('mod-catalog.PRODUCT.CREATE_TITLE')
    // this.subtitle = this.translate.instant('mod-catalog.PRODUCT.CREATE_SUBTITLE')
    // this.save = true
    // this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    // this.edit = false
    // this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    // this.cancel = true
    // this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    // this.cierreModal = "true"
    // this.componentePrecargado = CREAR_PRODUCT_COMPONENT

    // const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    // if (idButton) {
    //   idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
    //   idButton.click()
    // }
  }

  async verData(_id: string) {
    // this.title = this.translate.instant('mod-catalog.PRODUCT.SEE_TITLE')
    // const response = await this.productosService.getDataProduct(_id)
    // const { nombre } = response.data || { nombre: 'xxxxxxx' }
    // this.translate.get('mod-catalog.PRODUCT.SEE_SUBTITLE', { "product_name": nombre }).subscribe((res: string) => { this.subtitle = res });
    // this.tamano = "xl"
    // this.scrollable = true
    // this.save = false
    // this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    // this.edit = false
    // this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    // this.cancel = true
    // this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    // this.cierreModal = "true"
    // this.componentePrecargado = VER_PRODUCT_COMPONENT

    // const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    // if (idButton) {
    //   this.router.navigate([], {
    //     queryParams: { id_brand: this.route.snapshot.queryParams?.['id_brand'], id_product: _id },
    //   });
    //   idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
    //   idButton.click()
    // }
  }

  async editarData(_id: string) {
    // this.title = this.translate.instant('mod-catalog.PRODUCT.EDIT_TITLE')
    // const response = await this.productosService.getDataProduct(_id)
    // const { nombre } = response.data || { nombre: 'xxxxxxx' }
    // this.translate.get('mod-catalog.PRODUCT.EDIT_SUBTITLE', { "product_name": nombre }).subscribe((res: string) => { this.subtitle = res });
    // this.tamano = "xl"
    // this.scrollable = true
    // this.save = false
    // this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    // this.edit = true
    // this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    // this.cancel = true
    // this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    // this.componentePrecargado = EDITAR_PRODUCT_COMPONENT

    // const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    // if (idButton) {
    //   this.router.navigate([], {
    //     queryParams: { id_brand: this.route.snapshot.queryParams?.['id_brand'], id_product: _id },
    //   });
    //   idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
    //   idButton.click()
    // }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData(_id: string[]) {
    // const response = await this.productosService.getDataProduct(_id[0])
    // const { nombre } = response.data || { nombre: 'xxxxxxx' }
    // const name_user = (_id.length === 1) ? nombre : "(" + _id.length + ")"
    // const count_users = (_id.length === 1) ? 'el' : 'los'
    // const plural = (_id.length === 1) ? '' : 's'

    // this.translate.get('mod-catalog.PRODUCT.SWAL_ARE_YOU_SURE_DELETE', { "art_the": count_users, "plural": plural, "product_name": name_user }).subscribe((translatedTitle: string) => {
    //   Swal.fire({
    //     title: translatedTitle,
    //     text: this.translate.instant('mod-catalog.SWAL_WARNING_REVERSE_CHANGE'),
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: this.translate.instant('mod-catalog.SWAL_BUTTON_DELETE'),
    //     cancelButtonText: this.translate.instant('mod-catalog.SWAL_BUTTON_CANCEL')
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       if (result.isConfirmed) {
    //         await this.productosService.deleteProduct(_id)
    //         await this.someInput.reload()
    //         Swal.fire({
    //           title: this.translate.instant('mod-catalog.PRODUCT.SWAL_DELETED'),
    //           text: this.translate.instant('mod-catalog.SWAL_DELETED_RECORD'),
    //           icon: "success"
    //         });
    //       }
    //     }
    //   });
    // });
  }

  async filtroData() {
    let filtros = await $('.complementoRuta').val();
    this.router.navigate([], {
      queryParams: { search: filtros },
    });
    if (typeof filtros === 'string') {
      this.filters = filtros
    }
  }

  async refrescarTabla() {
    console.log('actualice')
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

  async actualizarContadores() {
    const data = await this.varService.obtenerTotale()
    this.count_total_var = data.data.count_total_var
  }
}
