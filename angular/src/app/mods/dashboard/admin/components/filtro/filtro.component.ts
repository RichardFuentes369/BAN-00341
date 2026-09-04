import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class FiltroLoteComponent implements OnChanges {

  @Input() idProducto: any;
  @Output() dataResultLote = new EventEmitter<any>();

  protected validationSubject = new Subject<void>();
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
    const isProductoValido = this.idProducto !== null &&
      this.idProducto !== undefined &&
      String(this.idProducto).trim() !== '';

    this.validators.lote = (this.lote.length === 0);

    const isValid = !this.validators.lote && isProductoValido;

    const boton = document.querySelector('.btnFilterBatch') as HTMLButtonElement;
    if (boton) {
      isValid ? boton.classList.remove('disabled') : boton.classList.add('disabled');
    }

    return isValid;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idProducto']) {
      this.isFormValid != this.isFormValid
      this.validationSubject.next();
    }
  }

  limpiarCampo() {
    this.lote = ''
  }




}
