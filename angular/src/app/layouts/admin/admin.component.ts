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
import { DateComponent } from '@component/globales/date/date.component';
import { AuthService } from '@guard/service/auth.service';
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { SettingsService } from '@mod/me/admin/pages/settings/service/settings.service';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    DateComponent,
    BreadcrumbsComponent,
    ColormodeComponent,
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

  constructor(
    private router: Router,
    private userService :AuthService,
    private principalService :PrincipalService,
    private translate: TranslateService,
    private settingsService: SettingsService
  ) {}

  minimizarSliderbar: boolean = false;
  nombreModulo: string = '';

  firstName: string = ''
  lastName: string = ''

  async ngOnInit() {
    this.ejecutarInitReal()
    
    this.settingsService.refreshAction$.subscribe(() => {
      this.ejecutarInitReal()
    });
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

  idiomaCambiar(valor: string){
    this.translate.use(valor)
  }

  cerrarSession(){
    localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN)
    localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL)
    this.router.navigate([LAYOUT_ADMIN_PAGE_LOGOUT]);
  }

  mostrarMenuLateral(){
    this.minimizarSliderbar = !this.minimizarSliderbar
  }

}