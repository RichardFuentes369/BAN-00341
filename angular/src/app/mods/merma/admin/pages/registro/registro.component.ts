import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { RegistroService } from './service/registro.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_REGISTRO_COMPONENT, EDITAR_REGISTRO_COMPONENT, VER_REGISTRO_COMPONENT } from '@mod/merma/const/loss.conts';
import Swal from 'sweetalert2';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';

@Component({
  selector: 'app-merma-registro',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    KpicardComponent
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroMermaComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private registroService :RegistroService,
    private translate: TranslateService
  ) { }
  
  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-merma.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=''
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = `registro-mermas/obtener-registro-mermas?month=${(!this.route.snapshot.queryParams?.['month'])?null:this.route.snapshot.queryParams?.['month']}&year=${(!this.route.snapshot.queryParams?.['anho'])?null:this.route.snapshot.queryParams?.['anho']}`
  habilitarSeleccion = true
  filters = ''

  columnas: any[] = [
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_BATCH'),
      data: 'id_lote.lote',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_TYPE'),
      data: 'id_tipo_merma.nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_REPORT_DATE'),
      data: 'fecha_reporte',
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
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_AMOUNT'),
      data: 'cantidad',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_LOST_VALUE'),
      data: 'valor_perdido',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_OBSERVATION'),
      data: 'observacion',
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
  buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  img_user_actived = "assets/images/img_admin.png"
  titlePage = this.translate.instant('mod-merma.TABLE_TITLE')
  titleTotalRegister = this.translate.instant('mod-merma.REGISTER.CARD_TOTAL_REGISTER_TITLE')
  count_total_register_merma = '0'
  // fin datos envio card information

  cargarIdioma = true;
  mostrarCards = true;
  isAnimationDone = false;

  anho = ''

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

    const permiso_modulo = await this.permisosService.permisoPage(0,'merma',userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(44,'registro_merma',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos_registro = await this.permisosService.permisos(userData.data.id,'registro_merma')
    const permisos_historico = await this.permisosService.permisos(userData.data.id,'historico_merma')

    const esHistorico = this.router.url.includes('/historico');
    this.permisos = esHistorico ? permisos_historico.data : permisos_registro.data;

    // sessionStorage.removeItem('nit')
    // sessionStorage.removeItem('razon_social')
    // sessionStorage.removeItem('correo')

    this.anho = (this.route.snapshot.queryParams?.['anho']) ? this.route.snapshot.queryParams?.['anho'] : new Date().getFullYear()

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
        title: this.translate.instant('mod-merma.REGISTER.COLUMN_ID'),
        data: 'id_lote.lote',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-merma.REGISTER.COLUMN_TYPE'),
        data: 'id_tipo_merma.nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-merma.REGISTER.COLUMN_BATCH'),
        data: 'fecha_reporte',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-merma.REGISTER.COLUMN_REPORT_DATE'),
        data: 'cantidad',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-merma.REGISTER.COLUMN_LOST_VALUE'),
        data: 'valor_perdido',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-merma.REGISTER.COLUMN_OBSERVATION'),
        data: 'observacion',
        className: 'text-center align-middle'
      },
    ];  
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-merma.TABLE_TITLE')
    this.titleTotalRegister = this.translate.instant('mod-merma.REGISTER.CARD_TOTAL_REGISTER_TITLE')
  }

  crearData (_id: string){
    this.tamano = "xl"
    this.scrollable = true
    this.title = this.translate.instant('mod-merma.REGISTER.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-merma.REGISTER.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_REGISTRO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    this.title = this.translate.instant('mod-merma.REGISTER.SEE_TITLE')
    const response = await this.registroService.getDataRegister(_id)
    this.translate.get('mod-merma.REGISTER.SEE_SUBTITLE', { "register_name": response.data?.id_lote?.lote }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_REGISTRO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_merma: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    this.title = this.translate.instant('mod-merma.REGISTER.EDIT_TITLE')
    const response = await this.registroService.getDataRegister(_id)
    this.translate.get('mod-merma.REGISTER.SEE_SUBTITLE', { "register_name": response.data?.id_lote?.lote }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = EDITAR_REGISTRO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_merma: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData (_id: string[]){
    const response = await this.registroService.getDataRegister(_id[0])
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    const name_user = (_id.length === 1) ? firstName+" "+lastName : "("+_id.length+")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'
    
    this.translate.get('mod-merma.TYPE.SWAL_ARE_YOU_SURE_DELETE',{ "art_the": count_users, "plural": plural, "user_name": name_user}).subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-merma.SWAL_WARNING_REVERSE_CHANGE'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-merma.SWAL_BUTTON_DELETE'),
        cancelButtonText: this.translate.instant('mod-merma.SWAL_BUTTON_CANCEL')
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            await this.registroService.deleteRegister(_id)
            await this.someInput.reload()
            Swal.fire({
              title: this.translate.instant('mod-merma.TYPE.SWAL_DELETED'),
              text: this.translate.instant('mod-merma.SWAL_DELETED_RECORD'),
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

  async actualizarContadores (){
    let year = (this.route.snapshot.queryParams?.['year'] != undefined) ? this.route.snapshot.queryParams?.['year'] : null
    let month = (this.route.snapshot.queryParams?.['month'] != undefined) ? this.route.snapshot.queryParams?.['month'] : null
    const data = await this.registroService.obtenerTotale(year, month)
    this.count_total_register_merma = data.data.count_total_register_merma
  }
}
