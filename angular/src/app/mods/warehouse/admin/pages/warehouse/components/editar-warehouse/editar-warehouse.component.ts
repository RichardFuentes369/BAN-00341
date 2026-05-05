import { Component, OnInit } from '@angular/core';
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
  selector: 'app-editar-warehouse',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-warehouse.component.html',
  styleUrl: './editar-warehouse.component.scss',
})
export class EditarWarehouseComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private loteService: LoteService,
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
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: 0,
    cantidad_vendida: 0,
    stock: 0,
    costo_unitario: 0,
    precio_venta_sugerido: 0,
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

  lote: LoteInterface[] = []
  loteReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    this.validators.lote = (this.model.lote.trim().length === 0)
    this.validators.fecha_entrada = (this.model.fecha_entrada.trim().length === 0)
    this.validators.fecha_vencimiento = (this.model.fecha_vencimiento.trim().length === 0)
    this.validators.cantidad_comprada = (this.model.cantidad_comprada <= 0)
    this.validators.cantidad_vendida = (this.model.cantidad_vendida <= 0)
    this.validators.stock = (this.model.stock <= 0)
    this.validators.costo_unitario = (this.model.costo_unitario <= 0)
    this.validators.precio_venta_sugerido = (this.model.precio_venta_sugerido <= 0)
    this.validators.estado = (this.model.estado === '')

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.lote && !this.validators.fecha_entrada && !this.validators.fecha_vencimiento && !this.validators.cantidad_comprada && !this.validators.cantidad_vendida && !this.validators.stock && !this.validators.costo_unitario && !this.validators.precio_venta_sugerido && !this.validators.estado) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.lote && !this.validators.fecha_entrada && !this.validators.fecha_vencimiento && !this.validators.cantidad_comprada && !this.validators.cantidad_vendida && !this.validators.stock && !this.validators.costo_unitario && !this.validators.precio_venta_sugerido && !this.validators.estado
  }
  
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.loteReal = await this.loteService.getDataLote(this.route.snapshot.queryParams?.['id_lote'])

    this.lote.push(this.loteReal.data)
    console.log(this.lote)

    this.model.id = this.loteReal.data.id
    this.model.lote = this.loteReal.data.lote
    this.model.fecha_entrada = this.loteReal.data.fecha_entrada
    this.model.fecha_vencimiento = this.loteReal.data.fecha_vencimiento
    this.model.cantidad_comprada = this.loteReal.data.cantidad_comprada
    this.model.cantidad_vendida = this.loteReal.data.cantidad_vendida
    this.model.stock = this.loteReal.data.stock
    this.model.costo_unitario = this.loteReal.data.costo_unitario
    this.model.precio_venta_sugerido = this.loteReal.data.precio_venta_sugerido
    this.model.estado = this.loteReal.data.estado
  }

  // async actualizarData(){

  //   if(this.isFormValid){
  //     let endPoint = this.productosService
  
  //     await endPoint.updateProduct(
  //       {
  //         "codigo_barra": this.model.codigo_barra,
  //         "nombre": this.model.nombre,
  //         "stock_minimo": this.model.stock_minimo,
  //         "unidad_medida": this.model.unidad_medida,
  //         "marca": this.model.marca,
  //       },
  //       this.model.id
  //     ).then((response) =>{
  //       ocultarModalOscura()
  //       this.translate.get('mod-catalog.PRODUCT.SWAL_ARE_YOU_SURE_UPDATE').subscribe((translatedTitle: string) => {
  //         Swal.fire({
  //           title: this.translate.instant('mod-catalog.PRODUCT.SWAL_UPDATED'),
  //           text: this.translate.instant('mod-catalog.SWAL_UPDATED_RECORD'),
  //           icon: "success"
  //         });
  //       })
  //     }).catch(async error => {
  //       this.ngOnInit()
  //       if(typeof(error.response.data.message) == 'string'){
  //         Swal.fire(error.response.data.message);
  //       }else{
  //         Swal.fire(error.response.data.message[0]);
  //       }
  //     })
  //   }

  // }

}
