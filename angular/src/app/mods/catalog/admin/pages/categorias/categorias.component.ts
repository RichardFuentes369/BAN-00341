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
import { CategoriasService } from './service/categorias.service';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE, WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';
import { CREAR_CATEGORIA_COMPONENT, EDITAR_CATEGORIA_COMPONENT, FILTRO_CATEGORIA_COMPONENT, MOD_CATEGORY_PAGE_PRODUCT_ASSIGMENT, VER_CATEGORIA_COMPONENT } from '@mod/catalog/const/catalog.const';
import Swal from 'sweetalert2';
import { CardComponent } from '@component/globales/card/card.component';
import { GridcrudComponent } from '@component/globales/gridcrud/gridcrud.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    TranslateModule,
    SearchComponent,
    LoadingComponent,
    GridcrudComponent,
    ModalBoostrapComponent,
    CardComponent
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent implements OnInit, OnDestroy{

  // construcator
  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService,
    private categoriasService :CategoriasService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-catalog.BUTTON_SEARCH')
  iconFilter="fa fa-filter"
  componenteFilter=FILTRO_CATEGORIA_COMPONENT
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showPage = 1
  showperPage = 10
  endPoint = 'category/obtener-categorias'
  filters = ''
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

  // inicio datos envio card information
  img = "assets/images/img_admin.png"
  titleTotalCategorys = this.translate.instant('mod-catalog.CATEGORY.CARD_TOTAL_CATEGORIES_TITLE')
  titleTotalProducts = this.translate.instant('mod-catalog.CATEGORY.CARD_TOTAL_PRODUCTS_TITLE')
  contentInformation = "45"
  // fin datos envio card information

  cargarIdioma = true;

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0,'catalogo',userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(22,'categorias',userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id,'categorias')
    this.permisos = permisos.data
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('descripcion')

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(200).subscribe(() => {
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
  cambiarTextos(){
    this.titleTotalCategorys = this.translate.instant('mod-catalog.CATEGORY.CARD_TOTAL_CATEGORIES_TITLE')
    this.titleTotalProducts = this.translate.instant('mod-catalog.CATEGORY.CARD_TOTAL_PRODUCTS_TITLE')
  }
    
  crearData (_id: string){
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('mod-catalog.CATEGORY.CREATE_TITLE')
    this.save = true
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = CREAR_CATEGORIA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async verData (_id: string){
    const response = await this.categoriasService.getDataCategory(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    
    this.translate.get('mod-catalog.CATEGORY.SEE_TITLE', { "category_name": nombre }).subscribe((res: string) => {this.title = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = false
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.cierreModal = "true"
    this.componentePrecargado = VER_CATEGORIA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  async editarData (_id: string){
    const response = await this.categoriasService.getDataCategory(_id)
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    
    this.translate.get('mod-catalog.CATEGORY.EDIT_TITLE', { "category_name": nombre }).subscribe((res: string) => {this.title = res});
    this.tamano = "xl"
    this.scrollable = false
    this.save = false
    this.buttonSave = this.translate.instant('mod-catalog.BUTTON_SAVE_')
    this.edit = true
    this.buttonEdit = this.translate.instant('mod-catalog.BUTTON_UPDATE_')
    this.cancel = true
    this.buttonCancel = this.translate.instant('mod-catalog.BUTTON_CANCEL')
    this.componentePrecargado = EDITAR_CATEGORIA_COMPONENT

    const idButton = document.getElementById(WORD_KEY_ID_MI_BOTON_GLOBAL)
    if(idButton){
      this.router.navigate([], {
        queryParams: { id: _id },
      });
      idButton.setAttribute(WORD_KEY_COMPONENT_GLOBAL, this.componentePrecargado);
      idButton.click()
    }
  }

  @ViewChild(GridcrudComponent)
  someInput!: GridcrudComponent
  async eliminarData (_id: string[]){
    const response = await this.categoriasService.getDataCategory(_id[0])
    const { nombre } = response.data || { nombre: 'xxxxxxx' }
    const name_user = (_id.length === 1) ? nombre: "("+_id.length+")"
    const count_users = (_id.length === 1) ? 'el' : 'los'
    const plural = (_id.length === 1) ? '' : 's'
    
    this.translate.get('mod-catalog.CATEGORY.SWAL_ARE_YOU_SURE_DELETE',{ "art_the": count_users, "plural": plural, "user_name": name_user}).subscribe((translatedTitle: string) => {
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
            await this.categoriasService.deleteCategory(_id)
            await this.someInput.reload()
            Swal.fire({
              title: this.translate.instant('mod-catalog.CATEGORY.SWAL_DELETED'),
              text: this.translate.instant('mod-catalog.SWAL_DELETED_RECORD'),
              icon: "success"
            });
          }
        }
      });
    });
  }

  asignarData (data: { id: string, ctrlKey: boolean }){
    const url = `${MOD_CATEGORY_PAGE_PRODUCT_ASSIGMENT}?id=${data.id}`;
    if (data.ctrlKey) {
      window.open(url, '_blank');
    } else {
      this.router.navigate([MOD_CATEGORY_PAGE_PRODUCT_ASSIGMENT], { queryParams: { id: data.id } });
    }
  }

  async filtroData(){
    let filtros = await $('.complementoRuta').val();
    this.router.navigate([], {
      queryParams: { search: filtros },
    });
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
