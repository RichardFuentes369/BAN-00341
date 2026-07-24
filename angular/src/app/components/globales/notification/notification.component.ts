import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { MOD_ALERT_PAGE_EXPIRATION, MOD_ALERT_PAGE_STOCK } from '@mod/alerts/const/alerts.const';
import { TranslateModule } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';

@Component({
  selector: 'app-globales-notification',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    TranslateModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit{

  isDarkMode: string = ''
  @HostListener('window:themeChanged', ['$event'])
  onThemeChanged(event: Event): void {
    const customEvent = event as CustomEvent;
    this.isDarkMode = customEvent.detail;
  }

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService
  ) { }

  public MOD_ALERT_PAGE_EXPIRATION = MOD_ALERT_PAGE_EXPIRATION
  public MOD_ALERT_PAGE_STOCK = MOD_ALERT_PAGE_STOCK

  menu: any[] = []
  
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const submodulo = await this.permisosService.permisoPage(0,'alertas',userData.data.id)

    if (submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    } 

    const modulo = await this.permisosService.permisos(userData.data.id,'alertas')
    this.menu = modulo.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_permiso === nombre);
  }

}
