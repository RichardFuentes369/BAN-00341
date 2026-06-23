import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import Swal from 'sweetalert2'

import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';

import { PrincipalService } from './service/principal.service';
import { SearchComponent } from '@component/globales/search/search.component';
import { ReportComponent } from '@component/globales/report/report.component'
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_USUARIO_COMPONENT, EDITAR_USUARIO_COMPONENT, FILTRO_USUARIO_COMPONENT, MOD_USER_PAGE_ADMIN_ASSIGMENT, REPORT_USUARIO_COMPONENT, STORAGE_KEY_PROFILE_ADMIN, VER_PERMISOS_COMPONENT, VER_USUARIO_COMPONENT } from '@mod/users/const/users.const'
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';
import { HttpParams } from '@angular/common/http';
import { ReportePermisosComponent } from './components/reporte-permisos/reporte-permisos.component';
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SearchComponent,
    ReportComponent,
    LoadingComponent,
    TablecrudComponent,
    ModalBoostrapComponent,
    KpicardComponent,
    ReportePermisosComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private route: ActivatedRoute,
    private mosuloService: ModulosService,
    private permisosService :PermisosService,
    private principalService :PrincipalService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-users.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_USUARIO_COMPONENT
  // fin datos envio al filtro

  // inicio datos envio report
  iconReport="fa fa-file-download"
  componenteReport=REPORT_USUARIO_COMPONENT
  // fin datos envio repor

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'admin/obtener-usuarios-administradores'
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-users.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_EMAIL'),
      data: 'email',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_NAMES'),
      data: 'firstName',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_LASTNAME'),
      data: 'lastName',
      className: 'text-center align-middle'
    },    
    {
      title: this.translate.instant('mod-users.COLUMN_PERMISSION_COUNT'),
      data: 'totalPermisos',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_STATUS'),
      data: 'isActive',
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
  buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal

  // inicio datos envio card information
  img_user_actived = "assets/images/img_actived.png"
  img_user_with_permission = "assets/images/img_permission.png"
  img_user_inactived = "assets/images/img_inactived.png"
  titlePage = this.translate.instant('mod-users.TABLE_TITLE')
  titleTotalUsers = this.translate.instant('mod-users.CARD_TOTAL_ADMIN_TITLE')
  titleTotalPermission = this.translate.instant('mod-users.CARD_TOTAL_PERMISSIONS_TITLE')
  titleTotalActivedUsers = this.translate.instant('mod-users.CARD_TOTAL_ACTIVED_USERS')
  titleTotalSuspendedUsers = this.translate.instant('mod-users.CARD_TOTAL_SUSPENDED_USERS')
  count_total_users = '0'
  count_actived_users = '0'
  count_suspend_users = '0'
  count_permissions_assigment = '0'

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

    const permiso_modulo = await this.permisosService.permisoPage(0,'usuarios',userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(1,'administradores',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'administradores')
    this.permisos = permisos.data;
    this.permisosAcciones = this.permisos;
    
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    sessionStorage.removeItem('isActive')

    await this.actualizarContadores()

    this.route.queryParams.subscribe(params => {
      const valorSearch = params['search'];
      if (valorSearch) {
        this.filters = valorSearch;
      } else {
        this.filters = '';
      }
    });

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(50).subscribe(() => {
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
        title: this.translate.instant('mod-users.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_EMAIL'),
        data: 'email',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_NAMES'),
        data: 'firstName',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_LASTNAME'),
        data: 'lastName',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_PERMISSION_COUNT'),
        data: 'totalPermisos',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_STATUS'),
        data: 'isActive',
        className: 'text-center align-middle',
        width: '50px',
        render: (data: any, type: any) => {
          if (type === 'display') {
            const statusText = data 
              ? this.translate.instant('mod-users.WORD_ACTIVED') 
              : this.translate.instant('mod-users.WORD_INACTIVED');
            
            const dotClass = data ? 'dot-green' : 'dot-red';

            return `
              <span class="custom-tooltip tooltip-bottom" data-title="${statusText}">
                <span class="status-dot ${dotClass}"></span>
              </span>
            `;
          }
          return data;
        }
      }
    ]
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-users.TABLE_TITLE')
    this.titleTotalUsers = this.translate.instant('mod-users.CARD_TOTAL_ADMIN_TITLE')
    this.titleTotalPermission = this.translate.instant('mod-users.CARD_TOTAL_PERMISSIONS_TITLE')
    this.titleTotalActivedUsers = this.translate.instant('mod-users.CARD_TOTAL_ACTIVED_USERS')
    this.titleTotalSuspendedUsers = this.translate.instant('mod-users.CARD_TOTAL_SUSPENDED_USERS')
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }

  crearData (_id: string){
    localStorage.setItem(STORAGE_KEY_PROFILE, STORAGE_KEY_PROFILE_ADMIN)
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-users.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-users.CREATE_SUBTITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_USUARIO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()

      this.actualizarContadores()
    }
  }

  async verData (_id: string){
    this.title = this.translate.instant('mod-users.SEE_TITLE')
    const response = await this.principalService.getDataUser(_id)
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    this.translate.get('mod-users.SEE_SUBTITLE', { "user_name": firstName + ' ' + lastName }).subscribe((res: string) => {this.subtitle = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_USUARIO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], { queryParams: { rol: 'admin', id_user: _id } });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    localStorage.setItem(STORAGE_KEY_PROFILE, STORAGE_KEY_PROFILE_ADMIN)
    const response = await this.principalService.getDataUser(_id)
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    this.translate.get('mod-users.EDIT_SUBTITLE', { "user_name": firstName + ' ' + lastName }).subscribe((res: string) => {this.subtitle = res});
    this.title = this.translate.instant('mod-users.EDIT_TITLE')
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_USUARIO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { rol: 'admin', id_user: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData (_id: string[]){
    const response = await this.principalService.getDataUser(_id[0])
    const { firstName, lastName } = response.data || { firstName: 'xxxxxxx', lastName: 'yyyyyyy' }
    const name_user = (_id.length === 1) ? firstName+" "+lastName : "("+_id.length+")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'
    
    this.translate.get('mod-users.SWAL_ARE_YOU_SURE_DELETE_USER',{ "art_the": count_users, "plural": plural, "user_name": name_user}).subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-users.SWAL_WARNING_REVERSE_CHANGE'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-users.SWAL_BUTTON_DELETE'),
        cancelButtonText: this.translate.instant('mod-users.SWAL_BUTTON_CANCEL')
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            await this.principalService.deleteUser(_id)
            await this.someInput.reload()
            Swal.fire({
              title: this.translate.instant('mod-users.SWAL_DELETED'),
              text: this.translate.instant('mod-users.SWAL_DELETED_RECORD'),
              icon: "success"
            });
            await this.actualizarContadores()
          }
       }
      });
    });
  }
  
  activarData (_id: string[]){
    let opcionesSelect = {
      1: this.translate.instant('mod-users.WORD_ACTIVED'),
      0: this.translate.instant('mod-users.WORD_INACTIVED'),
    };

    Swal.fire({
        title: this.translate.instant('mod-users.LABEL_USER_STATUS'),
        input: 'select',
        inputOptions: opcionesSelect,
        inputPlaceholder: this.translate.instant('mod-users.SELECT_STATUS_USER_SELECT_OPTION'),
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value === '') {
                    resolve(this.translate.instant('mod-users.SWAL_WORD_ONE_OPTION_SELECTION'));
                } else {
                    resolve();
                }
            });
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
          await this.principalService.updateStatusUser(_id, result.value)
          await this.someInput.reload()
          Swal.fire({
            title: this.translate.instant('mod-users.SWAL_UPDATED'),
            text: this.translate.instant('mod-users.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        }
    });
  }

  asignarData (data: { id: string, ctrlKey: boolean }){
    const url = `${MOD_USER_PAGE_ADMIN_ASSIGMENT}?id_user=${data.id}`;
    if (data.ctrlKey) {
      window.open(url, '_blank');
    } else {
      this.router.navigate([MOD_USER_PAGE_ADMIN_ASSIGMENT], { queryParams: { id_user: data.id } });
    }
  }

  async filtroData(){
    let filtros = $('.complementoRuta').val()
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
    const data = await this.principalService.obtenerTotale()
    this.count_total_users = data.data.count_total_users
    this.count_actived_users = data.data.count_actived_users
    this.count_suspend_users = data.data.count_suspend_users
    this.count_permissions_assigment = data.data.count_permissions_assigment
  }

  async verPermisos (filtrosHijo?: any){
    
    const queryParams: any = {}
    
    if (filtrosHijo) {
      if (filtrosHijo.modulo && filtrosHijo.modulo != 0) queryParams.modulo = (await this.mosuloService.getNameById(+filtrosHijo.modulo)).data[0].nombre
      if (filtrosHijo.submodulo  && filtrosHijo.submodulo != 0) queryParams.submodulo = (await this.mosuloService.getNameById(+filtrosHijo.submodulo)).data[0].nombre
      if (filtrosHijo.permiso && filtrosHijo.permiso != 0) queryParams.permiso = (await this.mosuloService.getNameById(+filtrosHijo.permiso)).data[0].nombre
    }

    this.router.navigate([], { 
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });

    this.translate.get('mod-users.SEE_PERMISSIONS_TITLE').subscribe((res: string) => {this.title = res});
    this.subtitle = ''
    this.tamano = "xl"
    this.scrollable = true
    this.save = false
    this.buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_PERMISOS_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
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

    this.principalService.descargarReporte(formato, params).subscribe({
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
