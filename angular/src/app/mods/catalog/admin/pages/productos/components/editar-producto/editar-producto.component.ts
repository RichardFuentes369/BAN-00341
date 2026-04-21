import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { ocultarModalOscura } from '@function/System';
import { AuthService } from '@guard/service/auth.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss',
})
export class EditarProductoComponent implements OnInit {

  private validationSubject = new Subject<void>();
  isFormValid = false;
  marcas: any[] = [];
  isLoading: boolean = false
  filtro: string = ''
  
  // Arreglo para el loop y objeto para validación/envío
  producto: any[] = [];
  model: any = {};

  validators = {
    estado: false,
    codigo_barra: false,
    nombre: false,
    marca: false,
    stock_minimo: false,
    unidad_medida: false,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private userService: AuthService,
    private translate: TranslateService
  ) {
    // Escucha cambios y valida con un pequeño delay para mejorar rendimiento
    this.validationSubject.pipe(
      debounceTime(300),
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const idParam = this.route.snapshot.queryParams?.['id_product'];
    
    if (idParam) {
        const res = await this.productosService.getDataProduct(idParam);
        const prodData = res.data;

        if (prodData.marca) {
          this.marcas = [prodData.marca]; 
          prodData.id_marca = prodData.marca.id; 
        }

        this.producto = [prodData];
        this.model = { ...prodData };
        this.checkValidation();
    }
  }


  onSelectChange(event: any, item: any) {
    item.id_marca = event ? event.id : null;
    item.marca = event ? event : null; 
    
    this.onInputChange(item); 
    this.checkValidation()
  }

  onSearch(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro = term;
      this.getMarcas();
    }
  }

  async getMarcas() {
    this.isLoading = true;
    try {
      const marcasList = await this.productosService.getDataBrand(this.filtro);
      const actual = this.producto[0]?.marca;
      this.marcas = actual 
        ? [actual, ...marcasList.data.filter((m: any) => m.id !== actual.id)]
        : [...marcasList.data];
    } finally {
      this.isLoading = false;
    }
  }

  onInputChange(item: any) {
    this.model = { ...item };
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    const regexBarCode = /^[0-9]{13}$/;
    this.validators.nombre = (this.model.nombre.trim().length === 0)
    this.validators.marca = (this.model.id_marca == null)
    this.validators.codigo_barra = (this.model.codigo_barra === null || !regexBarCode.test((this.model.codigo_barra as any).toString()))
    this.validators.stock_minimo = (this.model.stock_minimo <= 0);
    this.validators.unidad_medida = (this.model.unidad_medida === '');
    this.validators.estado = (this.model.estado === null);

    // this.validators.es_perecedero = (this.model.estado === 0);
    // this.validators.alerta_amarilla = (this.model.estado === 0);
    // this.validators.alerta_naranja = (this.model.estado === 0);

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.estado) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    return !this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.estado
  }

  async actualizarData() {
    if (this.isFormValid) {
      try {
        await this.productosService.updateProduct(this.model, this.model.id);
        ocultarModalOscura();
        
        Swal.fire({
          title: this.translate.instant('mod-catalog.PRODUCT.SWAL_UPDATED'),
          text: this.translate.instant('mod-catalog.SWAL_UPDATED_RECORD'),
          icon: "success"
        });
      } catch (error: any) {
        const msg = error.response?.data?.message;
        Swal.fire('Error', Array.isArray(msg) ? msg[0] : msg, 'error');
      }
    }
  }
}