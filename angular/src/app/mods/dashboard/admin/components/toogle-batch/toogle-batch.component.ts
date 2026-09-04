import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toogle-batch',
  standalone: true,
  templateUrl: './toogle-batch.component.html',
  styleUrl: './toogle-batch.component.scss',
})
export class ToogleBatchComponent {

  public tiene_lote: boolean = false

  @Output() public tieneLoteChange = new EventEmitter<boolean>();

  public cambiarLote(valor: boolean): void {
    this.tiene_lote = valor;
    this.tieneLoteChange.emit(this.tiene_lote);
  }

}
