import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BodegaService } from '@mod/warehouse/admin/pages/warehouse/service/warehouse.service';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, map, Subject } from 'rxjs';

@Component({
  selector: 'app-reporte-lote',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroLoteComponent {

  @Input() idProducto: any;
  @Output() dataResultLote = new EventEmitter<any>();

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private bodegaService: BodegaService
  ) {
    this.validationSubject.pipe(
      debounceTime(300),
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  lote = ''
  loteNotFound = false

  data = {
    proveedor: {
      nit: '',
      razon_social: '',
      correo: '',
    },
    lote: {
      id: '',
      lote: '',
      fecha_entrada: '',
      fecha_vencimiento: '',
      cantidad_comprada: '',
      cantidad_vendida: '',
      cantidad_en_bodega: '',
      cantidad_afectada_por_merma: '',
      estado: ''
    }
  }

  validators = {
    lote: false,
  }

  checkValidation(): boolean {

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.lote = (this.lote.length === 0)

    const boton = document.querySelector('.btnFilterBatch') as HTMLButtonElement
    (!this.validators.lote) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    return !this.validators.lote
  }

  limpiarCampo (){
    this.lote = ''
  }

  async filtrarLote() {
    try {
      const response = await this.bodegaService.getDataLoteAndProduct(this.lote, this.idProducto);
      if (response.status === 200) {
        this.data.proveedor.nit = response.data.id_proveedor.nit
        this.data.proveedor.razon_social = response.data.id_proveedor.razon_social
        this.data.proveedor.correo = response.data.id_proveedor.correo

        this.data.lote.id = response.data.id,
        this.data.lote.lote = response.data.lote,
        this.data.lote.fecha_entrada = response.data.fecha_entrada,
        this.data.lote.fecha_vencimiento = response.data.fecha_vencimiento,
        this.data.lote.cantidad_comprada = response.data.cantidad_comprada,
        this.data.lote.cantidad_vendida = response.data.cantidad_vendida,
        this.data.lote.cantidad_en_bodega = response.data.cantidad_en_bodega,
        this.data.lote.cantidad_afectada_por_merma = response.data.mermas,
        this.data.lote.estado = response.data.estado
        
        this.dataResultLote.emit(this.data)

        this.loteNotFound = false
      }
    } catch (error: any) {
      this.dataResultLote.emit()
      this.loteNotFound = true
    }
  }


}
