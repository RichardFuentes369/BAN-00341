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
import { CommonModule } from '@angular/common';
import { MedidaService } from '../../../medida/service/medida.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgSelectModule, CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
})
export class CrearProductoComponent implements OnInit {
  private validationSubject = new Subject<void>();
  isFormValid = false;
  marcas: any[] = [];
  medidas: any[] = [];
  isLoading: boolean = false
  filtro: string = ''
  isReadonly:boolean = false

  model = {
    es_perecedero: false,
    estado: null,
    codigo_barra: '',
    nombre: '',
    id_marca: null, 
    stock_minimo: 1,
    id_medida: 0,
    alerta_amarilla: 1, 
    alerta_naranja: 1
  };

  validators = {
    estado: false,
    codigo_barra: false,
    nombre: false,
    marca: false,
    stock_minimo: false,
    id_medida: false,
    es_perecedero: false,
    error_dias: false,
    error_dias_nulos: false,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private medidaService: MedidaService,
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
    if(!this.route.snapshot.queryParams?.['id_brand']){
      this.isReadonly = false
      this.getMarcas();
      this.getMedida()
    }else{
      this.isReadonly = true
      this.getMarca()
      this.getMedida()
    }
  }

  onInputChange() {
    this.model.id_medida = +this.model.id_medida;
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    const regexBarCode = /^[0-9]{13}$/;
    this.validators.nombre = (this.model.nombre.trim().length === 0)
    this.validators.marca = (this.model.id_marca == null)
    this.validators.codigo_barra = (this.model.codigo_barra === null || !regexBarCode.test((this.model.codigo_barra as any).toString()))
    this.validators.stock_minimo = (this.model.stock_minimo <= 0);
    this.validators.id_medida = (this.model.id_medida === 0);
    this.validators.estado = (this.model.estado === null);

    if(this.model.es_perecedero){
      this.validators.error_dias = (this.model.alerta_naranja < this.model.alerta_amarilla);
      this.validators.error_dias_nulos = (this.model.alerta_naranja === 0 || this.model.alerta_amarilla === 0);
    }

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.id_medida && !this.validators.estado) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    return !this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.id_medida && !this.validators.estado
  }

  async crearProducto() {
    if (this.isFormValid) {
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

  get esCodigoValido(): boolean {
    const codigo = (this.model?.codigo_barra || '').toString();
    return codigo.length === 13;
  }

  get longitudCodigo(): number {
    return (this.model?.codigo_barra || '').toString().length;
  }

  async getMarcas() {
    this.isLoading = true;
    try {
      const marcasList = await this.productosService.getDataBrandSearch(this.filtro)
      this.marcas = [...marcasList.data];
    } finally {
      this.isLoading = false;
    }
  }  
  
  async getMedida() {
    this.isLoading = true;
    try {
      const medidaList = await this.medidaService.getDataList()
      this.medidas = medidaList.data[0].result;
    } finally {
      this.isLoading = false;
    }
  }

  async getMarca() {
    if (!this.route.snapshot.queryParams?.['id_brand']) return;

    try {
      const response = await this.productosService.getDataBrand(this.route.snapshot.queryParams?.['id_brand']);
      const marca = response.data; 

      const exists = this.marcas.find(m => m.id === marca.id);
      if (!exists) {
        this.marcas = [...this.marcas, marca]; 
      }
      
      this.model.id_marca = marca.id; 
    } catch (error) {
      console.error("Error al cargar la marca inicial", error);
    }
  }

  onSelectChange(item: any) {
    this.model.id_marca = (item != undefined) ? item.id : null
    this.checkValidation()
  }
}
