import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { FILTRO_USUARIO_COMPONENT } from '@mod/users/const/users.const';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { STORAGE_KEY_PROFILE_ADMIN } from '@mod/catalog/const/catalog.const';
import Swal from 'sweetalert2';
import { ProveedoresService } from './service/proveedores.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss',
})
export class ProveedoresComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private proveedoresService :ProveedoresService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-catalog.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_USUARIO_COMPONENT
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'supplier/obtener-proveedores'
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_ID'),
      data: 'id',
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NIT'),
      data: 'nit',
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NAME'),
      data: 'razon_social',
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_ADDRESS'),
      data: 'direccion',
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_PHONE'),
      data: 'telefono',
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_EMAIL'),
      data: 'correo',
    },
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  // inicio datos envio al modal
  tamano = ""
  scrollable = false
  title = ""
  save = true
  buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  cargarTabla = true;

    // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0,'usuarios',userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(1,'administradores',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'administradores')
    this.permisos = permisos.data
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    sessionStorage.removeItem('isActive')

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarTabla = false;
      timer(200).subscribe(() => {
        this.listar(); 
        this.cargarTabla = true;
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
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_ID'),
        data: 'id',
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NIT'),
        data: 'nit',
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NAME'),
        data: 'razon_social',
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_PHONE'),
        data: 'direccion',
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_EMAIL'),
        data: 'telefono',
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_ADDRESS'),
        data: 'correo',
      },
    ];  
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent

  async filtroData(){
    let filtros = await $('.complementoRuta').val();
    if(typeof filtros === 'string'){
      this.filters = filtros
    }
  }

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }
}
