import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '@component/globales/card/card.component';
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
import { CARGAR_PRODUCT_COMPONENT, CREAR_PRODUCT_COMPONENT, EDITAR_PRODUCT_COMPONENT, FILTRO_PRODUCT_COMPONENT, MOD_CATEGORY_PAGE_CATEGORY, VER_PRODUCT_COMPONENT } from '@mod/catalog/const/catalog.const';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    CardComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
})
export class ProductosComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private productosService :ProductosService,
    private translate: TranslateService
  ) { }
  
  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-users.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_PRODUCT_COMPONENT
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'product/obtener-productos'
  complementoEndPoint = `&id_category=${this.route.snapshot.queryParamMap.get('id_category')}`
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_ID'),
      data: 'id',
      className: 'text-center',
      visible: false,
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BRAND'),
      data: 'marca',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_NAME'),
      data: 'nombre',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
      data: 'codigo_barra',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STOCK'),
      data: 'stock_minimo',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_UNIT_OF_MEASUREMENT'),
      data: 'unidad_medida',
      className: 'text-center'
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

    const permiso_modulo = await this.permisosService.permisoPage(0,'catalogo',userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(22,'productos',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    if(!this.route.snapshot.queryParamMap.get('id_category')){
      this.router.navigate([MOD_CATEGORY_PAGE_CATEGORY]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'productos')
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
  listar(){
    this.columnas = [
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_ID'),
        data: 'id',
        className: 'text-center',
        visible: false,
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BRAND'),
        data: 'marca',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_NAME'),
        data: 'nombre',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
        data: 'codigo_barra',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_STOCK'),
        data: 'stock_minimo',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_UNIT_OF_MEASUREMENT'),
        data: 'unidad_medida',
        className: 'text-center'
      },
    ]
  }

  // metodos Componente
  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
    this.titleTotalProducts = this.translate.instant('mod-catalog.PRODUCT.CARD_TOTAL_PRODUCTS_TITLE')
  }

  crearData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
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
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  cargarData(_id: string){
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
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    this.title = this.translate.instant('mod-catalog.PRODUCT.SEE_TITLE')
    const response = await this.productosService.getDataProduct(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.PRODUCT.SEE_SUBTITLE', { "product_name": nombre }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_PRODUCT_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_category: this.route.snapshot.queryParams?.['id_category'], id_product: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    this.title = this.translate.instant('mod-catalog.PRODUCT.SEE_TITLE')
    const response = await this.productosService.getDataProduct(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.PRODUCT.EDIT_TITLE', { "product_name": nombre }).subscribe((res: string) => {this.title = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_PRODUCT_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_category: this.route.snapshot.queryParams?.['id_category'], id_product: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData (_id: string[]){
    const response = await this.productosService.getDataProduct(_id[0])
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    const name_user = (_id.length === 1) ? nombre: "("+_id.length+")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'
    
    this.translate.get('mod-catalog.PRODUCT.SWAL_ARE_YOU_SURE_DELETE',{ "art_the": count_users, "plural": plural, "product_name": name_user}).subscribe((translatedTitle: string) => {
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

  async filtroData(){
    let filtros = await $('.complementoRuta').val();
    this.router.navigate([], {
      queryParams: { id_category: this.route.snapshot.queryParams?.['id_category'], search: filtros },
    });
    if(typeof filtros === 'string'){
      this.filters = filtros
    }
  }

  async refrescarTabla (){
    console.log('actualice')
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

  async actualizarContadores (){
  }
}
