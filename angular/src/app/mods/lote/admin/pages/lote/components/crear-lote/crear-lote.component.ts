import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { LoteService } from '../../service/lote.service';


@Component({
  selector: 'app-crear-lote',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-lote.component.html',
  styleUrl: './crear-lote.component.scss',
})
export class CrearLoteComponent {

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private loteService: LoteService,
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
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: '',
    cantidad_vendida: '',
    stock: '',
    costo_unitario: '',
    precio_venta_sugerido: '',
    estado: ''
  }

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

    this.validators.lote = (this.model.lote.trim().length === 0)
    this.validators.fecha_entrada = (this.model.fecha_entrada.trim().length === 0)
    this.validators.fecha_vencimiento = (this.model.fecha_vencimiento.trim().length === 0)
    this.validators.cantidad_comprada = (this.model.cantidad_comprada.trim().length === 0)
    this.validators.cantidad_vendida = (this.model.cantidad_vendida.trim().length === 0)
    this.validators.stock = (this.model.stock.trim().length === 0)
    this.validators.costo_unitario = (this.model.costo_unitario.trim().length === 0)
    this.validators.precio_venta_sugerido = (this.model.precio_venta_sugerido.trim().length === 0)
    this.validators.estado = (this.model.estado.trim().length === 0)

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.lote && !this.validators.fecha_entrada && !this.validators.fecha_vencimiento && !this.validators.cantidad_comprada && !this.validators.cantidad_vendida && !this.validators.stock && !this.validators.costo_unitario && !this.validators.precio_venta_sugerido && !this.validators.estado) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.lote && !this.validators.fecha_entrada && !this.validators.fecha_vencimiento && !this.validators.cantidad_comprada && !this.validators.cantidad_vendida && !this.validators.stock && !this.validators.costo_unitario && !this.validators.precio_venta_sugerido && !this.validators.estado
  }

  async crearLote(){
    if(this.isFormValid){
      let endPoint = this.loteService

      const response = await endPoint.createBatch(this.model)
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
          title: this.translate.instant('mod-lote.CATEGORY.SWAL_CREATED'),
          text: this.translate.instant('mod-lote.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }
  }
}
