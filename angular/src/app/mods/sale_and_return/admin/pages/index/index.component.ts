import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { MOD_SALERETURN_PAGE_RETURN, MOD_SALERETURN_PAGE_SALE } from '@mod/sale_and_return/const/sale_and_return.const';
import { TranslateModule } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';

@Component({
  selector: 'app-menu-sold_return-index',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: AuthService,
    private permisosService: PermisosService
  ) { }

  public MOD_SALERETURN_PAGE_SALE = MOD_SALERETURN_PAGE_SALE
  public MOD_SALERETURN_PAGE_RETURN = MOD_SALERETURN_PAGE_RETURN

  menu: any[] = []

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const submodulo = await this.permisosService.permisoPage(0, 'ventas_y_devoluciones', userData.data.id)

    if (submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const modulo = await this.permisosService.permisos(userData.data.id, 'ventas_y_devoluciones')
    this.menu = modulo.data
  }

  tienePermiso(nombre: string): boolean {
    return this.menu.some((permiso) => permiso.permiso_permiso === nombre);
  }

}
