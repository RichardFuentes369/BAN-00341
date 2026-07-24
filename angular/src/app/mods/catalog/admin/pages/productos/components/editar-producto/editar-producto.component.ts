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
import { MedidaService } from '../../../medida/service/medida.service';

interface ProctoInteface {
  es_perecedero: boolean,
  estado: boolean,
  codigo_barra: string,
  nombre: string,
  marca: {
    id: number,
    nombre: string
  },
  medida: {
    id: number,
    nombre: string
  },
  id_marca: number, 
  stock_minimo: number,
  unidad_medida: string,
  alerta_amarilla: number, 
  alerta_naranja: number
}

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
  medidas: any[] = [];
  isLoading: boolean = false
  filtro: string = ''
  isReadonly:boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private medidaService: MedidaService,
    private userService: AuthService,
    private translate: TranslateService
  ) {
    this.validationSubject.pipe(
      debounceTime(300),
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }
  
  model = {
    es_perecedero: false,
    estado: false,
    codigo_barra: '',
    nombre: '',
    id_marca: 0, 
    id_medida: 0, 
    stock_minimo: 1,
    unidad_medida: '',
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
    es_perecedero: false,
    error_dias: false,
    error_dias_nulos: false,
  };

  producto: ProctoInteface[] = [];
  productoReal: any

  async ngOnInit() {

    if(!this.route.snapshot.queryParams?.['id_brand']){
      this.isReadonly = false
      this.getMarcas();
      this.getMedida()
    }else{
      this.isReadonly = true
      this.getMarca()
      this.getMedida()
    }
    
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

        this.model.id_marca = this.producto[0].marca.id
        this.model.id_medida = this.producto[0].medida.id
        this.model.es_perecedero = this.producto[0].es_perecedero,
        this.model.estado = this.producto[0].estado,
        this.model.codigo_barra = this.producto[0].codigo_barra,
        this.model.nombre = this.producto[0].nombre,
        this.model.stock_minimo = this.producto[0].stock_minimo,
        this.model.unidad_medida = this.producto[0].unidad_medida,
        this.model.alerta_amarilla = this.producto[0].alerta_amarilla, 
        this.model.alerta_naranja = this.producto[0].alerta_naranja

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
    if (term && term.length >= 1) {
      this.filtro = term;
      this.getMarcas();
    }
  }

  async getMarcas() {
    this.isLoading = true;
    try {
      const marcasList = await this.productosService.getDataBrandSearch(this.filtro);
      const actual = this.producto[0]?.marca;
      this.marcas = actual 
        ? [actual, ...marcasList.data.filter((m: any) => m.id !== actual.id)]
        : [...marcasList.data];
    } finally {
      this.isLoading = false;
    }
  }

  get esCodigoValido(): boolean {
    const codigo = (this.model?.codigo_barra || '').toString();
    return codigo.length === 13;
  }

  get longitudCodigo(): number {
    return (this.model?.codigo_barra || '').toString().length;
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

  onInputChange(item: any) {
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

    if(this.model.es_perecedero){
      this.validators.error_dias = (
        this.model.alerta_amarilla <= this.model.alerta_naranja || 
        this.model.alerta_amarilla === null || 
        this.model.alerta_naranja === null
      );
      this.validators.error_dias_nulos = (this.model.alerta_naranja === 0 || this.model.alerta_amarilla === 0);
    }


    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.estado && !this.validators.error_dias && !this.validators.error_dias_nulos) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    return !this.validators.nombre && !this.validators.marca && !this.validators.codigo_barra && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.estado && !this.validators.error_dias && !this.validators.error_dias_nulos
  }

  async actualizarData() {
    if (this.isFormValid) {
      try {
        await this.productosService.updateProduct(this.model, this.route.snapshot.queryParams?.['id_product']);
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

  mostrarSeccion = {
    productSeccion: true,
    stockSeccion: true,
    esPerecedero: true,
  }

  toogleSection(sectionActive: string){
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
    }
  }
}