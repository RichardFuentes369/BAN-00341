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
import { LoteService } from '../../service/warehouse.service';
import { AuthService } from '@guard/service/auth.service';

interface LoteInterface {
  'id': number,
  'lote': string,
  'fecha_entrada': number,
  'fecha_vencimiento': number | string,
  'cantidad_comprada': number,
  'cantidad_vendida': number,
  'stock': number,
  'costo_unitario': number,
  'precio_venta_sugerido': number,
  'estado': string
}

@Component({
  selector: 'app-ver-warehouse',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './ver-warehouse.component.html',
  styleUrl: './ver-warehouse.component.scss',
})
export class VerWarehouseComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private loteService: LoteService,
    private translate: TranslateService
  ){ }
  
  lote: LoteInterface[] = []
  permisos: any[] = []
  loteReal: any

  validators = {
    lote: false,
    fecha_entrada: false,
    fecha_vencimiento: false,
    cantidad_comprada: false,
    cantidad_vendida: false,
    stock: false,
    costo_unitario: false,
    precio_venta_sugerido: false,
    estado: false
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.loteReal = await this.loteService.getDataLote(this.route.snapshot.queryParams?.['id_lote'])

    this.lote.push(this.loteReal.data)
  }

}
