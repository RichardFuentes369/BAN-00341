import { Router } from '@angular/router'
import { Component, OnInit, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';

import { TranslateModule } from '@ngx-translate/core';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_TOKEN_ADMIN } from '@const/app.const';
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
  ADMIN_PAGE_MENU_PERSMISSION_ALERTS,
  LAYOUT_ADMIN_PAGE_ALERT,
  LAYOUT_ADMIN_PAGE_SYSTEM,
  ADMIN_PAGE_MENU_PERSMISSION_CONFIGURABLE,
  ADMIN_PAGE_MENU_PERSMISSION_CUSTOM,
  LAYOUT_ADMIN_PAGE_CUSTOM,
} from '@mod/main/const/main.const';

@Component({
  selector: 'app-mod-menu-admin',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuAdminComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: AuthService,
    private permisosService: PermisosService
  ) { }

  public ADMIN_PAGE_MENU_PERSMISSION_USERS = ADMIN_PAGE_MENU_PERSMISSION_USERS
  public ADMIN_PAGE_MENU_PERSMISSION_CATALOG = ADMIN_PAGE_MENU_PERSMISSION_CATALOG
  public ADMIN_PAGE_MENU_PERSMISSION_LOSS = ADMIN_PAGE_MENU_PERSMISSION_LOSS
  public ADMIN_PAGE_MENU_PERSMISSION_MODULES = ADMIN_PAGE_MENU_PERSMISSION_MODULES
  public ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE = ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE
  public ADMIN_PAGE_MENU_PERSMISSION_CONFIGURABLE = ADMIN_PAGE_MENU_PERSMISSION_CONFIGURABLE
  public ADMIN_PAGE_MENU_PERSMISSION_CUSTOM = ADMIN_PAGE_MENU_PERSMISSION_CUSTOM
  public ADMIN_PAGE_MENU_PERSMISSION_ALERTS = ADMIN_PAGE_MENU_PERSMISSION_ALERTS
  public LAYOUT_ADMIN_PAGE_USERS = LAYOUT_ADMIN_PAGE_USERS
  public LAYOUT_ADMIN_PAGE_MODULES = LAYOUT_ADMIN_PAGE_MODULES
  public LAYOUT_ADMIN_PAGE_WAREHOUSE = LAYOUT_ADMIN_PAGE_WAREHOUSE
  public LAYOUT_ADMIN_PAGE_LOSS = LAYOUT_ADMIN_PAGE_LOSS
  public LAYOUT_ADMIN_PAGE_CATALOG = LAYOUT_ADMIN_PAGE_CATALOG
  public LAYOUT_ADMIN_PAGE_ALERT = LAYOUT_ADMIN_PAGE_ALERT
  public LAYOUT_ADMIN_PAGE_SYSTEM = LAYOUT_ADMIN_PAGE_SYSTEM
  public LAYOUT_ADMIN_PAGE_CUSTOM = LAYOUT_ADMIN_PAGE_CUSTOM

  menu: any[] = []

  async ngOnInit() {

    for (const key in localStorage) {
      if (key != STORAGE_KEY_TOKEN_ADMIN) {
        delete localStorage[key];
      }
    }

    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const response = await this.permisosService.permisos(userData.data.id, '')
    this.menu = response.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_permiso === nombre);
  }

}
