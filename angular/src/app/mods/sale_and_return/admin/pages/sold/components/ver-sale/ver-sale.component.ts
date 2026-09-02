import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { VentaService } from '../../service/venta.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { CommonModule } from '@angular/common';

// 1. Nueva interfaz para los elementos internos del detalle
export interface DetalleItem {
  lote: string;
  codigo_barra: string;
  cantidad: string;
}

// 2. Actualizamos la interfaz principal
export interface VentaInterface {
  id: number;
  detalle_factura: DetalleItem[]; // Ahora es un array tipado, no un string
  fecha_venta: number;
  nro_factura: string;
}

@Component({
  selector: 'app-ver-sale',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './ver-sale.component.html',
  styleUrl: './ver-sale.component.scss',
})
export class VerSaleComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private ventaService: VentaService,
  ) { }

  venta: VentaInterface[] = [];
  permisos: any[] = [];
  ventaReal: any;

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);

    this.ventaReal = await this.ventaService.getDataSold(
      this.route.snapshot.queryParams?.['id_sale']
    );

    // Obtenemos los datos crudos de la API
    const dataCruda = this.ventaReal.data;

    if (dataCruda) {
      // 3. Parseamos el string JSON de la base de datos a un array de objetos
      const ventaProcesada: VentaInterface = {
        ...dataCruda,
        detalle_factura: typeof dataCruda.detalle_factura === 'string'
          ? JSON.parse(dataCruda.detalle_factura)
          : dataCruda.detalle_factura
      };

      // 4. Lo agregamos al arreglo para que tu @for lo lea sin errores
      this.venta.push(ventaProcesada);
    }
  }

  tienePermiso(nombre: string): boolean {
    return this.permisos.some((permiso) => permiso.permiso_permiso === nombre);
  }

  goTo(url: string, _id: number) {
    if (_id != 0) {
      this.router.navigate([url], { queryParams: { id: _id } });
    } else {
      this.router.navigate([url]);
    }
  }
}