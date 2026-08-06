import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_PROVEEDOR_COMPONENT, EDITAR_PROVEEDOR_COMPONENT, FILTRO_PROVEEDOR_COMPONENT, REPORT_PROVEEDOR_COMPONENT, VER_PROVEEDOR_COMPONENT } from '@mod/catalog/const/catalog.const';
import Swal from 'sweetalert2';
import { ProveedoresService } from './service/proveedores.service';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';
import { ReportComponent } from '@component/globales/report/report.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    ReportComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    KpicardComponent
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss',
})
export class ProveedoresComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private route: ActivatedRoute,
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
  componenteFilter=FILTRO_PROVEEDOR_COMPONENT
  // fin datos envio al filtro

  // inicio datos envio report
  iconReport="fa fa-file-download"
  componenteReport=REPORT_PROVEEDOR_COMPONENT
  // fin datos envio repor

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'supplier/obtener-proveedores'
  orderField = 'id'
  order = 'asc'
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NIT'),
      data: 'nitCompleto',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NAME'),
      data: 'razon_social',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_ADDRESS'),
      data: 'direccion',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_PHONE'),
      data: 'telefono',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_EMAIL'),
      data: 'correo',
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
  img_user_actived = "assets/images/img_admin.png"
  titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
  titleTotalSuppliers = this.translate.instant('mod-catalog.SUPPLIER.CARD_TOTAL_SUPPLIERS_TITLE')
  count_total_suppliers = 0
  // fin datos envio card information

  cargarIdioma = true;
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

    const permiso_modulo = await this.permisosService.permisoPage(0,'catalogo',userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(22,'proveedores',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'proveedores')
    this.permisos = permisos.data
    sessionStorage.removeItem('nit')
    sessionStorage.removeItem('razon_social')
    sessionStorage.removeItem('correo')

    // await this.actualizarContadores()

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(200).subscribe(() => {
        // this.actualizarContadores()
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
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NIT'),
        data: 'nitCompleto',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_NAME'),
        data: 'razon_social',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_PHONE'),
        data: 'direccion',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_EMAIL'),
        data: 'telefono',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.SUPPLIER.COLUMN_BUSINESS_ADDRESS'),
        data: 'correo',
        className: 'text-center align-middle'
      },
    ];  
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
    this.titleTotalSuppliers = this.translate.instant('mod-catalog.SUPPLIER.CARD_TOTAL_SUPPLIERS_TITLE')
  }
  
  crearData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-catalog.SUPPLIER.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-catalog.SUPPLIER.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_PROVEEDOR_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    this.title = this.translate.instant('mod-catalog.SUPPLIER.SEE_TITLE')
    const response = await this.proveedoresService.getDataProvider(_id)
    const { razon_social } = response.data || { razon_social: 'xxxxxxx' }
    this.translate.get('mod-catalog.SUPPLIER.EDIT_SUBTITLE', { "supplier_name": razon_social }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_PROVEEDOR_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_supplier: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async rowsCountData(_rowsCount: string) {
    this.count_total_suppliers = parseInt(_rowsCount)
  }

  async editarData (_id: string){
    this.title = this.translate.instant('mod-catalog.SUPPLIER.EDIT_TITLE')
    const response = await this.proveedoresService.getDataProvider(_id)
    const { razon_social } = response.data || { razon_social: 'xxxxxxx' }
    this.translate.get('mod-catalog.SUPPLIER.EDIT_SUBTITLE', { "supplier_name": razon_social }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_PROVEEDOR_COMPONENT  

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_supplier: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData (_id: string[]){
    const response = await this.proveedoresService.getDataProvider(_id[0])
    const { razon_social } = response.data || { razon_social: 'xxxxxxx' }
    const name_user = (_id.length === 1) ? razon_social : "("+_id.length+")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'
    
    this.translate.get('mod-catalog.SUPPLIER.SWAL_ARE_YOU_SURE_DELETE',{ "art_the": count_users, "plural": plural, "user_name": name_user}).subscribe((translatedTitle: string) => {
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
            await this.proveedoresService.deleteProvider(_id)
            await this.someInput.reload()
            Swal.fire({
              title: this.translate.instant('mod-catalog.SUPPLIER.SWAL_DELETED'),
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

  // async actualizarContadores (){
  //   const data = await this.proveedoresService.obtenerTotale()
  //   this.count_total_suppliers = data.data.count_total_suppliers
  // }

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

    this.proveedoresService.descargarReporte(formato, params).subscribe({
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
