import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '@component/globales/card/card.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { SearchComponent } from '@component/globales/search/search.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { TipoService } from './service/tipo.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_TIPO_COMPONENT, EDITAR_TIPO_COMPONENT, FILTRO_TIPO_COMPONENT, VER_TIPO_COMPONENT } from '@mod/merma/const/loss.conts';
import Swal from 'sweetalert2';
import { GridcrudComponent } from '@component/globales/gridcrud/gridcrud.component';

@Component({
  selector: 'app-merma-tipo',
  standalone: true,
  imports: [
    TranslateModule,
    GridcrudComponent,
    SearchComponent,
    LoadingComponent,
    ModalBoostrapComponent,
    CardComponent
  ],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss',
})
export class TipoMermaComponent implements OnInit, OnDestroy{
  
  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private tipoService :TipoService,
    private translate: TranslateService
  ) { }
  
  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-merma.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_TIPO_COMPONENT
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'tipos_merma/obtener-tipo-mermas'
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-merma.TYPE.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-merma.TYPE.COLUMN_NAME'),
      data: 'nombre',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-merma.TYPE.COLUMN_TOTAL'),
      data: 'totalMermas',
      className: 'text-center'
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
  buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  img = "assets/images/img_admin.png"
  titlePage = this.translate.instant('mod-merma.TABLE_TITLE')
  titleTotalSuppliers = this.translate.instant('mod-merma.TYPE.CARD_TOTAL_TYPE_TITLE')
  count_total_type_merma = '0'
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

    const permiso_modulo = await this.permisosService.permisoPage(0,'merma',userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(44,'tipo_merma',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'tipo_merma')
    this.permisos = permisos.data
    sessionStorage.removeItem('nombre')

    await this.actualizarContadores()

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(200).subscribe(() => {
        this.listar(); 
        this.actualizarContadores();
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
        title: this.translate.instant('mod-merma.TYPE.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-merma.TYPE.COLUMN_NAME'),
        data: 'nombre',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-merma.TYPE.COLUMN_TOTAL'),
        data: 'totalMermas',
        className: 'text-center'
      }
    ];  
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-merma.TABLE_TITLE')
    this.titleTotalSuppliers = this.translate.instant('mod-merma.TYPE.CARD_TOTAL_TYPE_TITLE')
  }
  
  crearData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-merma.TYPE.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-merma.TYPE.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_TIPO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    this.title = this.translate.instant('mod-merma.TYPE.SEE_TITLE')
    const response = await this.tipoService.getDataTipo(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-merma.TYPE.SEE_SUBTITLE', { "type_name": nombre }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_TIPO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_tipo_merma: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    this.title = this.translate.instant('mod-merma.TYPE.EDIT_TITLE')
    const response = await this.tipoService.getDataTipo(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    this.translate.get('mod-merma.TYPE.EDIT_SUBTITLE', { "type_name": nombre }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-merma.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-merma.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-merma.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_TIPO_COMPONENT  

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id_tipo_merma: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(GridcrudComponent)
  someInput!: GridcrudComponent
  async eliminarData (_id: string[]){
    const response = await this.tipoService.getDataTipo(_id[0])
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
            await this.tipoService.deleteTipo(_id)
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
    const data = await this.tipoService.obtenerTotale()
    this.count_total_type_merma = data.data.count_total_type_merma
  }
}
