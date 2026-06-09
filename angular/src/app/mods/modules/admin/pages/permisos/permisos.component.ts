import { Component, OnInit, ViewChild } from '@angular/core';
// import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import Swal from 'sweetalert2'
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_MODULO_PERMISO_COMPONENT, EDITAR_MODULO_PERMISO_COMPONENT, MOD_MODULES_PAGE_MODULES } from '@mod/modules/const/modules.const';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { Subscription, timer } from 'rxjs';
import { STORAGE_KEY_PROFILE_ADMIN } from '@mod/users/const/users.const';
import { GridcrudComponent } from '@component/globales/gridcrud/gridcrud.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [
    TranslateModule,
    TablecrudComponent,
    // GridcrudComponent,
    LoadingComponent,
    ModalBoostrapComponent,
  ],
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss'
})
export class PermisosComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private permisosService: PermisosService,
    private modulosService: ModulosService,
    private translate: TranslateService,
    private module: ModulosService,
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []
  moduloPadre: any = 0

  moduloReal = ''


  async ngOnInit() {
    if (!this.route.snapshot.queryParams?.['id_module']) {
      this.router.navigate([MOD_MODULES_PAGE_MODULES]);
    }
    if (this.route.snapshot.queryParams?.['id_submodule'] && !this.route.snapshot.queryParams?.['id_module']) {
      this.router.navigate([MOD_MODULES_PAGE_MODULES]);
    }

    if (this.route.snapshot.queryParams?.['id_module'] && this.route.snapshot.queryParams?.['id_submodule']) {
      this.moduloReal = this.route.snapshot.queryParams?.['id_submodule']
    }

    if (this.route.snapshot.queryParams?.['id_module'] && !this.route.snapshot.queryParams?.['id_submodule']) {
      this.moduloReal = this.route.snapshot.queryParams?.['id_module']
    }

    this.endPoint = `modulos/obtener-permisos-por-modulo/${this.moduloReal}`;

    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const modulo = await this.permisosService.permisos(userData.data.id, 'modulos')

    for (const permiso of modulo.data) {
      if (permiso.permiso_permiso != 'ver') {
        this.permisos.push(permiso)
      }
    }

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarTabla = false;
      timer(200).subscribe(() => {
        this.listar();
        this.cambiarTextos(); 
        this.cargarTabla = true;
      });
    });
  }

  // inicio datos que envio al componente
  mostrarTotal = false
  titlePage = this.translate.instant('mod-users.TABLE_TITLE')
  showcampoFiltro = true
  endPoint = ``
  habilitarSeleccion = true
  columnas = [
    {
      title: this.translate.instant('mod-modules.COLUMN_PERMISSION_NAME'),
      data: 'nombre',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-modules.COLUMN_PERMISSION_NICKNAME'),
      data: 'permiso',
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-modules.COLUMN_DESCRIPTION'),
      data: 'descripcion',
      className: 'text-center align-middle'
    },
  ]
  permisosAcciones = this.permisos
  // fin datos que envio al componente

  tamano = ""
  subtitle = ""
  scrollable = false
  title = ""
  save = true
  buttonSave = this.translate.instant('mod-modules.BUTTON_SAVE_')
  edit = true
  buttonEdit = this.translate.instant('mod-modules.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-modules.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""

  cargarTabla = true;

  search = true
  buttonSearch = "Buscar"
  iconFilter = "fa fa-filter"

  listar() {
    this.columnas = [
      {
        title: this.translate.instant('mod-modules.COLUMN_PERMISSION_NAME'),
        data: 'nombre',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-modules.COLUMN_PERMISSION_NICKNAME'),
        data: 'permiso',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-modules.COLUMN_DESCRIPTION'),
        data: 'descripcion',
        className: 'text-center align-middle'
      },
    ]
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-users.TABLE_TITLE')
  }

  crearData(_id: string) {
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-modules.CREATE_TITLE')
    this.subtitle = this.translate.instant('mod-modules.CREATE_SUBTITLE_PERMISSION')
    this.save = true
    this.buttonSave = this.translate.instant('mod-modules.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-modules.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-modules.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_MODULO_PERMISO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData(_id: string) {
    this.title = this.translate.instant('mod-modules.EDIT_TITLE')
    const response = await this.modulosService.getHasSubmodule(+_id)
    const { nombre } = response.data?.[0] || { nombre: 'xxxxxxx' }
    this.translate.get('mod-modules.EDIT_SUBTITLE_PERMISSION', { "module_name": nombre }).subscribe((res: string) => { this.subtitle = res });
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-modules.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-modules.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-modules.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = EDITAR_MODULO_PERMISO_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if (idButton) {
      this.router.navigate([], {
        queryParams: { id: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  async eliminarData(_id: string[]) {
    const response = await this.modulosService.getHasSubmodule(+_id)
    const { nombre } = response.data?.[0] || { nombre: 'xxxxxxx' }
    this.translate.get('mod-modules.SWAL_ARE_YOU_SURE', { "permission_name": nombre }).subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('mod-modules.SWAL_WARNING_REVERSE_CHANGE'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('mod-modules.SWAL_BUTTON_DELETE'),
        cancelButtonText: this.translate.instant('mod-modules.SWAL_BUTTON_CANCEL')
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await this.modulosService.eliminarPermiso(_id)
          await this.someInput.reload()

          if (response.data.status == 200) {
            Swal.fire({
              title: this.translate.instant('mod-modules.SWAL_DELETED'),
              text: this.translate.instant('mod-modules.SWAL_DELETED_RECORD'),
              icon: "success"
            });
          }
          if (response.data.status == 404) {
            Swal.fire({
              title: this.translate.instant('mod-modules.SWAL_DELETED'),
              text: response.data.message,
              icon: "error"
            });
          }
        }
      });
    });
  }

  async refrescarTabla() {
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }
}
