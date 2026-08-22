import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  @Output() dataResultLote = new EventEmitter<any>();

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
  ){
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
  
  filtrarLote(){
    this.loteNotFound = true
    // this.dataResultLote.emit(this.data)
  }

}
