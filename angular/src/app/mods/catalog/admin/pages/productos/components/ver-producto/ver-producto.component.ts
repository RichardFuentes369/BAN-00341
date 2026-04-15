import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@guard/service/auth.service';
import { ProductosService } from '../../service/productos.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';

@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './ver-producto.component.html',
  styleUrl: './ver-producto.component.scss',
})
export class VerProductoComponent implements OnInit {

  // Usamos any para manejar la flexibilidad de los objetos anidados de la base de datos
  producto: any[] = [];
  productoReal: any;

  // Los validadores se mantienen en false (estado neutro) para esta vista de consulta
  validators = {
    codigo_barra: false,
    nombre: false,
    marca: false,
    stock_minimo: false,
    unidad_medida: false,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private productosService: ProductosService,
    private translate: TranslateService
  ) { }

  async ngOnInit() {
    // Refrescamos sesión para asegurar permisos
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    
    const idProduct = this.route.snapshot.queryParams?.['id_product'];
    
    if (idProduct) {
      try {
        const res = await this.productosService.getDataProduct(idProduct);
        if (res && res.data) {
          // Cargamos el producto en el array para que el @for lo renderice
          this.producto = [res.data];
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    }
  }
}