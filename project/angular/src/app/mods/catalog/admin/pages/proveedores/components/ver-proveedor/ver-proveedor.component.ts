import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { Permisos } from '@function/System'
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';

interface ProveedorInterface {
  'id': number,
  'nit': string,
  'dv': string,
  'razon_social': string,
  'direccion': string,
  'correo': string,
  'telefono': string,
}

@Component({
  selector: 'app-ver-proveedor',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ver-proveedor.component.html',
  styleUrl: './ver-proveedor.component.scss',
})
export class VerProveedorComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private proveedoresService :ProveedoresService,
  ) { }

  proveedor: ProveedorInterface[] = []
  permisos: any[] = []
  proveedorReal: any

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.proveedorReal = await this.proveedoresService.getDataProvider(this.route.snapshot.queryParams?.['id_supplier'])

    this.proveedor.push(this.proveedorReal.data)
  }

}
