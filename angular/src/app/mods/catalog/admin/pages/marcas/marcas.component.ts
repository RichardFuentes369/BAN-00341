import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '@component/globales/card/card.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { MarcaService } from './service/marca.service';
import { Subscription, timer } from 'rxjs';
import { CREAR_MARCA_COMPONENT, EDITAR_MARCA_COMPONENT, FILTRO_MARCA_COMPONENT, MOD_CATEGORY_PAGE_PRODUCT_FOR_BRAND, VER_MARCA_COMPONENT } from '@mod/catalog/const/catalog.const';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    CardComponent
  ],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
})
export class MarcasComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private marcaService :MarcaService,
    private translate: TranslateService
  ) { }
  
  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-catalog.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_MARCA_COMPONENT
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'brand/obtener-marcas'
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.BRAND.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-catalog.BRAND.COLUMN_BRAND_NAME'),
      data: 'nombre',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-catalog.BRAND.COLUMN_TOTAL_PRODUCTS'),
      data: 'totalProductos',
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
  buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  img_user_actived = "assets/images/img_admin.png"
  titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
  titleTotalSuppliers = this.translate.instant('mod-catalog.BRAND.CARD_TOTAL_BRANDS_TITLE')
  count_total_brands = '0'
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
    const permiso_submodulo = await this.permisosService.permisoPage(22,'marcas',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'marcas')
    this.permisos = permisos.data
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

  // metodos Componente
  listar(){
    this.columnas = [
      {
        title: this.translate.instant('mod-catalog.BRAND.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-catalog.BRAND.COLUMN_BRAND_NAME'),
        data: 'nombre',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-catalog.BRAND.COLUMN_TOTAL_PRODUCTS'),
        data: 'totalProductos',
        className: 'text-center'
      },
    ];  
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
    this.titleTotalSuppliers = this.translate.instant('mod-catalog.BRAND.CARD_TOTAL_BRANDS_TITLE')
  }
  
  crearData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-catalog.BRAND.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-catalog.BRAND.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_MARCA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    this.title = this.translate.instant('mod-catalog.BRAND.SEE_TITLE')
    const response = await this.marcaService.getDataBrand(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.BRAND.EDIT_SUBTITLE', { "brand_name": nombre }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_MARCA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_brand: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    this.title = this.translate.instant('mod-catalog.BRAND.EDIT_TITLE')
    const response = await this.marcaService.getDataBrand(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-catalog.BRAND.EDIT_SUBTITLE', { "brand_name": nombre }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_MARCA_COMPONENT  

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_brand: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData (_id: string[]){
    const response = await this.marcaService.getDataBrand(_id[0])
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    const brand_name = (_id.length === 1) ? nombre : "("+_id.length+")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'

    this.translate.get('mod-catalog.BRAND.SWAL_ARE_YOU_SURE_DELETE',{ "art_the": count_users, "plural": plural, "brand_name": brand_name}).subscribe((translatedTitle: string) => {
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
            let response = await this.marcaService.deleteBrand(_id)
            await this.someInput.reload()

            if (response.data.status == 200) {
              Swal.fire({
                title: this.translate.instant('mod-catalog.BRAND.SWAL_DELETED'),
                text: this.translate.instant('mod-catalog.SWAL_DELETED_RECORD'),
                icon: "success"
              });
            }
            
            if (response.data.status == 404) {
              Swal.fire({
                title: this.translate.instant('mod-catalog.BRAND.SWAL_DELETED'),
                text: response.data.message,
                icon: "error"
              });
            }
          }
        }
      });
    });
  }

  asignarData (data: { id: string, ctrlKey: boolean }){
    const url = `${MOD_CATEGORY_PAGE_PRODUCT_FOR_BRAND}?id_brand=${data.id}`;
    if (data.ctrlKey) {
      window.open(url, '_blank');
    } else {
      this.router.navigate([MOD_CATEGORY_PAGE_PRODUCT_FOR_BRAND], { queryParams: { id_brand: data.id } });
    }
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
    const data = await this.marcaService.obtenerTotale()
    this.count_total_brands = data.data.count_total_brands
  }

}
