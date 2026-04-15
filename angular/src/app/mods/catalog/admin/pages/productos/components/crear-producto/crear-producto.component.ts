import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgSelectModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
})
export class CrearProductoComponent implements OnInit {
  private validationSubject = new Subject<void>();
  isFormValid = false;
  marcas: any[] = [];
  isLoading: boolean = false
  filtro: string = ''

  model = {
    es_perecedero: false,
    estado: 0,
    codigo_barra: '',
    nombre: '',
    marca: null, 
    stock_minimo: 1,
    unidad_medida: '',
    id_categoria: 0,
    alerta_amarilla: 1, 
    alerta_naranja: 1
  };

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
    private translate: TranslateService
  ) {
    this.validationSubject.pipe(
      debounceTime(300),
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  ngOnInit(): void {
    this.getMarcas();
  }

  onInputChange() {
    this.validationSubject.next();
  }

  // this.validators.nit = (this.model.nit === null || !regexNIT.test((this.model.nit as any).toString()));
  
  checkValidation(): boolean {
    const regexBarCode = /^[0-9]{13}$/;
    this.validators.nombre = (this.model.nombre.trim().length === 0)
    this.validators.marca = (this.model.marca == null)
    this.validators.codigo_barra = (this.model.codigo_barra === null || !regexBarCode.test((this.model.codigo_barra as any).toString()))
    this.validators.stock_minimo = (this.model.stock_minimo <= 0);
    this.validators.unidad_medida = (this.model.unidad_medida === '');
    this.validators.estado = (this.model.estado === 0);

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.estado) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    return !this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.estado
  }

  async crearProducto() {
    if (this.isFormValid) {
      this.model.id_categoria = Number(this.route.snapshot.queryParams?.['id_category']);
      const response = await this.productosService.createProduct(this.model);
      
      if (response.data.status == 200) {
        ocultarModalOscura();
        Swal.fire({
          title: this.translate.instant('mod-catalog.PRODUCT.SWAL_CREATED'),
          text: this.translate.instant('mod-catalog.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || 'Error desconocido',
          icon: 'error'
        });
      }
    }
  }

  onSearch(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro = term
      this.isLoading = true;
      this.getMarcas();
    }
  }

  async getMarcas() {

    this.isLoading = true;
    try {
      const marcasList = await this.productosService.getDataBrand(this.filtro)
      this.marcas = [...marcasList.data];
    } finally {
      this.isLoading = false;
    }
  }

  onSelectChange(item: any) {
    this.model.marca = (item != undefined) ? item.id : null
    this.checkValidation()
  }
}
