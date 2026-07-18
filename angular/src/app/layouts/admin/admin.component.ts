import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { BreadcrumbsComponent } from '@component/globales/breadcrumb/breadcrumb.component';
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { CommonModule } from '@angular/common';

import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const'
import { NAME_PAGE, LAYOUT_ADMIN_PAGE_LOGOUT, LAYOUT_PAGE_PROFILE, LAYOUT_PAGE_SETTINGS, LAYOUT_PAGE_DASHBOARD } from '@layout/const/layouts.const'
import { LAYOUT_ADMIN_PAGE_MOD } from '@layout/const/layouts.const'
import { ColormodeComponent } from '@component/globales/colormode/colormode.component';
import { AuthService } from '@guard/service/auth.service';
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { SettingsService } from '@mod/me/admin/pages/settings/service/settings.service';

import {
  ADMIN_PAGE_MENU_PERSMISSION_USERS,
  ADMIN_PAGE_MENU_PERSMISSION_MODULES,
  ADMIN_PAGE_MENU_PERSMISSION_CATALOG,
  ADMIN_PAGE_MENU_PERSMISSION_LOSS,
  ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE,
  LAYOUT_ADMIN_PAGE_USERS,
  LAYOUT_ADMIN_PAGE_MODULES,
  LAYOUT_ADMIN_PAGE_CATALOG,
  LAYOUT_ADMIN_PAGE_LOSS,
  LAYOUT_ADMIN_PAGE_WAREHOUSE,
  LAYOUT_ADMIN_PAGE_MENU,
  ADMIN_PAGE_MENU_PERSMISSION_ALERTS,
  LAYOUT_ADMIN_PAGE_ALERT,
} from '@mod/main/const/main.const';
import { MOD_USER_PAGE_ADMIN, MOD_USER_PAGE_FINAL } from '@mod/users/const/users.const';
import { MOD_CATEGORY_PAGE_BRAND, MOD_CATEGORY_PAGE_EXTENT, MOD_CATEGORY_PAGE_PRODUCT, MOD_CATEGORY_PAGE_SUPPLIER } from '@mod/catalog/const/catalog.const';
import { MOD_MERMA_PAGE_HISTORICO, MOD_MERMA_PAGE_REGISTRO, MOD_MERMA_PAGE_TIPOS } from '@mod/merma/const/loss.conts';
import { MOD_ALERT_PAGE_EXPIRATION, MOD_ALERT_PAGE_STOCK } from '@mod/alerts/const/alerts.const';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import Swal from 'sweetalert2';
import { VarService } from '@mod/vars/admin/pages/var/service/var.service';
import { VarsService } from '@service/globales/vars/vars.service';
import { NotificationComponent } from '@component/globales/notification/notification.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ColormodeComponent,
    NotificationComponent,
    IdiomaComponent,
    CommonModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_PAGE_DASHBOARD = LAYOUT_PAGE_DASHBOARD;
  public LAYOUT_PAGE_PROFILE = LAYOUT_PAGE_PROFILE;
  public LAYOUT_PAGE_SETTINGS = LAYOUT_PAGE_SETTINGS;
  public LAYOUT_ADMIN_PAGE_MOD = LAYOUT_ADMIN_PAGE_MOD;
  public CURRENT_YEAR = new Date().getFullYear();

  public ADMIN_PAGE_MENU_PERSMISSION_USERS = ADMIN_PAGE_MENU_PERSMISSION_USERS
  public MOD_USER_PAGE_ADMIN = MOD_USER_PAGE_ADMIN
  public MOD_USER_PAGE_FINAL = MOD_USER_PAGE_FINAL

  public ADMIN_PAGE_MENU_PERSMISSION_CATALOG = ADMIN_PAGE_MENU_PERSMISSION_CATALOG
  public MOD_CATEGORY_PAGE_PRODUCT = MOD_CATEGORY_PAGE_PRODUCT
  public MOD_CATEGORY_PAGE_SUPPLIER = MOD_CATEGORY_PAGE_SUPPLIER
  public MOD_CATEGORY_PAGE_BRAND = MOD_CATEGORY_PAGE_BRAND
  public MOD_CATEGORY_PAGE_EXTENT = MOD_CATEGORY_PAGE_EXTENT

  public ADMIN_PAGE_MENU_PERSMISSION_LOSS = ADMIN_PAGE_MENU_PERSMISSION_LOSS
  public MOD_MERMA_PAGE_TIPOS = MOD_MERMA_PAGE_TIPOS
  public MOD_MERMA_PAGE_REGISTRO = MOD_MERMA_PAGE_REGISTRO
  public MOD_MERMA_PAGE_HISTORICO = MOD_MERMA_PAGE_HISTORICO

  public ADMIN_PAGE_MENU_PERSMISSION_ALERTS = ADMIN_PAGE_MENU_PERSMISSION_ALERTS
  public MOD_ALERT_PAGE_EXPIRATION = MOD_ALERT_PAGE_EXPIRATION
  public MOD_ALERT_PAGE_STOCK = MOD_ALERT_PAGE_STOCK

  public ADMIN_PAGE_MENU_PERSMISSION_MODULES = ADMIN_PAGE_MENU_PERSMISSION_MODULES
  public ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE = ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE
  public LAYOUT_ADMIN_PAGE_MENU = LAYOUT_ADMIN_PAGE_MENU
  public LAYOUT_ADMIN_PAGE_USERS = LAYOUT_ADMIN_PAGE_USERS
  public LAYOUT_ADMIN_PAGE_MODULES = LAYOUT_ADMIN_PAGE_MODULES
  public LAYOUT_ADMIN_PAGE_WAREHOUSE = LAYOUT_ADMIN_PAGE_WAREHOUSE
  public LAYOUT_ADMIN_PAGE_LOSS = LAYOUT_ADMIN_PAGE_LOSS
  public LAYOUT_ADMIN_PAGE_CATALOG = LAYOUT_ADMIN_PAGE_CATALOG
  public LAYOUT_ADMIN_PAGE_ALERT = LAYOUT_ADMIN_PAGE_ALERT

  constructor(
    private router: Router,
    private userService: AuthService,
    private principalService: PrincipalService,
    private translate: TranslateService,
    private settingsService: SettingsService,
    private permisosService :PermisosService,
    private varService :VarService,
    private varsService: VarsService
  ) { }

  minimizarSliderbar: boolean = true;
  nombreModulo: string = '';

  nameApp: string = ''
  firstName: string = ''
  lastName: string = ''

  menu: any[] = []

  async ngOnInit() {
    this.ejecutarInitReal()
    this.settingsService.refreshAction$.subscribe(() => {
      this.ejecutarInitReal()
    });

    const response1 = await this.varsService.obtenerVar('AppName') as any;
    if (response1?.data?.valor) {
      this.nameApp = response1.data.valor;
    }
    
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const response = await this.permisosService.listaPermisos(userData.data.id)
    this.menu = response.data
  }

  async ejecutarInitReal() {
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const response = await this.principalService.getDataUser(userData.data.id)
    const { firstName, lastName } = response.data
    this.firstName = firstName
    this.lastName = lastName
  }

  upperFirst(texto: string) {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  idiomaCambiar(valor: string) {
    this.translate.use(valor)
  }

  cerrarSession() {
    localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN)
    localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL)
    this.router.navigate([LAYOUT_ADMIN_PAGE_LOGOUT]);
  }

  mostrarMenuLateral() {
    this.minimizarSliderbar = !this.minimizarSliderbar
  }

  tienePermiso(modulo: string, submodulo?: string, jerarquia: number = 0): boolean {
    // Buscamos el objeto del módulo padre
    const moduloPadre = this.menu.find(p => p.mpm_permiso === modulo);

    // Si no existe el módulo, no tiene permisos
    if (!moduloPadre || moduloPadre.asignado !== 1) {
      return false;
    }

    // Si la jerarquía es 0, ya validamos el padre arriba
    if (jerarquia === 0) {
      return true;
    }

    // Si la jerarquía es 1, validamos el hijo
    return moduloPadre.children?.some(
      (hijo: any) => hijo.mpm_permiso === submodulo && hijo.asignado === 1
    ) ?? false;
  }
}