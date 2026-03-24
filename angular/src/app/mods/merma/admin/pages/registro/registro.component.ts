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
import { RegistroService } from './service/registro.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';

@Component({
  selector: 'app-merma-registro',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    CardComponent
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroMermaComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private registroService :RegistroService,
    private translate: TranslateService
  ) { }
  
  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-registro.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=''
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'registro-mermas/obtener-registro-mermas'
  filters = ''
  columnas: any[] = [
    // {
    //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_ID'),
    //   data: 'id',
    //   visible: false,
    //   className: 'text-center'
    // },
    // {
    //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_NIT'),
    //   data: 'nit',
    //   className: 'text-center'
    // },
    // {
    //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_NAME'),
    //   data: 'razon_social',
    //   className: 'text-center'
    // },
    // {
    //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_ADDRESS'),
    //   data: 'direccion',
    //   className: 'text-center'
    // },
    // {
    //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_PHONE'),
    //   data: 'telefono',
    //   className: 'text-center'
    // },
    // {
    //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_EMAIL'),
    //   data: 'correo',
    //   className: 'text-center'
    // },
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  // inicio datos envio al modal
  tamano = ""
  scrollable = false
  title = ""
  save = true
  buttonSave = this.translate.instant('mod-registro.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-registro.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-registro.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  img_user_actived = "assets/images/img_admin.png"
  titlePage = this.translate.instant('mod-registro.TABLE_TITLE')
  titleTotalSuppliers = this.translate.instant('mod-registro.SUPPLIER.CARD_TOTAL_SUPPLIERS_TITLE')
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
    const permiso_submodulo = await this.permisosService.permisoPage(22,'proveedores',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'proveedores')
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
      // {
      //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_ID'),
      //   data: 'id',
      //   visible: false,
      //   className: 'text-center'
      // },
      // {
      //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_NIT'),
      //   data: 'nit',
      //   className: 'text-center'
      // },
      // {
      //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_NAME'),
      //   data: 'razon_social',
      //   className: 'text-center'
      // },
      // {
      //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_PHONE'),
      //   data: 'direccion',
      //   className: 'text-center'
      // },
      // {
      //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_EMAIL'),
      //   data: 'telefono',
      //   className: 'text-center'
      // },
      // {
      //   title: this.translate.instant('mod-registro.SUPPLIER.COLUMN_BUSINESS_ADDRESS'),
      //   data: 'correo',
      //   className: 'text-center'
      // },
    ];  
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-registro.TABLE_TITLE')
    this.titleTotalSuppliers = this.translate.instant('mod-registro.SUPPLIER.CARD_TOTAL_SUPPLIERS_TITLE')
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent

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
  }
}
