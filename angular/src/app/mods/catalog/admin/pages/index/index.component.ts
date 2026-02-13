import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { MOD_CATEGORY_PAGE_CATEGORY, MOD_CATEGORY_PAGE_PRODUCT, MOD_CATEGORY_PAGE_SUPPLIER } from '@mod/catalog/const/catalog.const';
import { TranslateModule } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit{

  constructor(
    private router: Router,
    private userService :AuthService,
    private permisosService :PermisosService
  ) { }

  public MOD_CATEGORY_PAGE_CATEGORY = MOD_CATEGORY_PAGE_CATEGORY
  public MOD_CATEGORY_PAGE_PRODUCT = MOD_CATEGORY_PAGE_PRODUCT
  public MOD_CATEGORY_PAGE_SUPPLIER = MOD_CATEGORY_PAGE_SUPPLIER

  menu: any[] = []

  async ngOnInit() {
    // await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    // const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    // const submodulo = await this.permisosService.permisoPage(0,'usuarios',userData.data.id)

    // if (submodulo.data === "") {
    //   this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    // } 

    // const modulo = await this.permisosService.permisos(userData.data.id,'usuarios')
    // this.menu = modulo.data
  }

}
