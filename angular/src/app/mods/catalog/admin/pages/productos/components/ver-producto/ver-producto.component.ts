import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE } from '@const/app.const';
import { ProductosService } from '../../service/productos.service';
import { AuthService } from '@guard/service/auth.service';

interface ProductoInterface {
  'id': number,
  'codigo_barra': string,
  'nombre': string,
  'stock_minimo': number,
  'unidad_medida': string,
  'marca': string,
}

@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './ver-producto.component.html',
  styleUrl: './ver-producto.component.scss',
})

export class VerProductoComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private productosService: ProductosService,
    private translate: TranslateService
  ){ }

  producto: ProductoInterface[] = []
  permisos: any[] = []
  productoReal: any

  validators = {
    codigo_barra: false,
    nombre: false,
    marca: false,
    stock_minimo: false,
    unidad_medida: false,
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.productoReal = await this.productosService.getDataProduct(this.route.snapshot.queryParams?.['id_product'])

    this.producto.push(this.productoReal.data)
  }

}
