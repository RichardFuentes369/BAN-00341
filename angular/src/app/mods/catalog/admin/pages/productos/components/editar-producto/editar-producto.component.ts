import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { ocultarModalOscura } from '@function/System';
import { AuthService } from '@guard/service/auth.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';

interface ProductoInterface {
  'id': number,
  'codigo_barra': string,
  'nombre': string,
  'stock_minimo': number,
  'unidad_medida': string,
  'marca': string,
}

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss',
})
export class EditarProductoComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private productosService: ProductosService,
    private userService :AuthService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  model = {
    id: '',
    codigo_barra: '',
    nombre: '',
    stock_minimo: 1,
    unidad_medida: '',
    marca: '',
  }

  validators = {
    codigo_barra: false,
    nombre: false,
    stock_minimo: false,
    unidad_medida: false,
    marca: false,
  }

  producto: ProductoInterface[] = []
  productoReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    this.validators.nombre = (this.model.nombre.trim().length === 0)
    this.validators.marca = (this.model.marca.trim().length === 0)
    this.validators.codigo_barra = (this.model.codigo_barra.trim().length === 0)
    this.validators.stock_minimo = (this.model.stock_minimo <= 0)
    this.validators.unidad_medida = (this.model.unidad_medida === '')

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.codigo_barra && !this.validators.nombre && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.marca) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.codigo_barra && !this.validators.nombre && !this.validators.stock_minimo && !this.validators.unidad_medida && !this.validators.marca
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.productoReal = await this.productosService.getDataProduct(this.route.snapshot.queryParams?.['id_product'])

    this.producto.push(this.productoReal.data)

    this.model.id = this.productoReal.data.id
    this.model.codigo_barra = this.productoReal.data.codigo_barra
    this.model.nombre = this.productoReal.data.nombre
    this.model.stock_minimo = this.productoReal.data.stock_minimo
    this.model.unidad_medida = this.productoReal.data.unidad_medida
    this.model.marca = this.productoReal.data.marca
  }

  async actualizarData(){

    if(this.isFormValid){
      let endPoint = this.productosService
  
      await endPoint.updateProduct(
        {
          "codigo_barra": this.model.codigo_barra,
          "nombre": this.model.nombre,
          "stock_minimo": this.model.stock_minimo,
          "unidad_medida": this.model.unidad_medida,
          "marca": this.model.marca,
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-catalog.PRODUCT.SWAL_ARE_YOU_SURE_UPDATE').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-catalog.PRODUCT.SWAL_UPDATED'),
            text: this.translate.instant('mod-catalog.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        })
      }).catch(async error => {
        this.ngOnInit()
        if(typeof(error.response.data.message) == 'string'){
          Swal.fire(error.response.data.message);
        }else{
          Swal.fire(error.response.data.message[0]);
        }
      })
    }

  }

}
