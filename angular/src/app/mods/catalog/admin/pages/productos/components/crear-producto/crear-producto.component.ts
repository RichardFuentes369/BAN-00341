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
import { STORAGE_KEY_PROFILE } from '@const/app.const';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
})
export class CrearProductoComponent {

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productosService: ProductosService,
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
    codigo_barra: '',
    nombre: '',
    marca: '',
    stock_minimo: 1,
    unidad_medida: '',
    id_categoria: 0,
  }

  validators = {
    codigo_barra: false,
    nombre: false,
    marca: false,
    stock_minimo: false,
    unidad_medida: false,
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    this.validators.nombre = (this.model.nombre.trim().length === 0)
    this.validators.marca = (this.model.marca.trim().length === 0)
    this.validators.codigo_barra = (this.model.codigo_barra.trim().length === 0)
    this.validators.stock_minimo = (this.model.stock_minimo <= 0)
    this.validators.unidad_medida = (this.model.unidad_medida === '')

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.codigo_barra && !this.validators.nombre && !this.validators.marca && !this.validators.stock_minimo && !this.validators.unidad_medida) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.codigo_barra && !this.validators.nombre && !this.validators.marca && !this.validators.stock_minimo && !this.validators.unidad_medida
  }

  async crearProducto(){
    if(this.isFormValid){
      let endPoint = this.productosService
      this.model.id_categoria = Number(this.route.snapshot.queryParams?.['id_category'])
      const response = await endPoint.createProduct(this.model)
      if(response.data.status == 404){
        ocultarModalOscura()
        Swal.fire({
          title: response.data.message,
          text: response.data.error,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      if(response.data.status == 200){
        ocultarModalOscura()
        Swal.fire({
          title: this.translate.instant('mod-catalog.PRODUCT.SWAL_CREATED'),
          text: this.translate.instant('mod-catalog.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }
  }

}
