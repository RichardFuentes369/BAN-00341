import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-gridcrud',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './gridcrud.component.html',
  styleUrl: './gridcrud.component.scss',
})
export class GridcrudCustomComponent implements OnInit {
  title: string = 'Prueba';
  idsSeleccionados: number[] = [];

  // Datos estáticos definidos aquí mismo
  datos = [
    { id: 1, nombre: 'Elemento A', descripcion: 'Descripción A' },
    { id: 2, nombre: 'Elemento B', descripcion: 'Descripción B' },
  ];

  ngOnInit(): void { }

  getValue(item: any, columnData: string) {
    return columnData.split('.').reduce((prev, curr) => prev && prev[curr], item);
  }

  toggleSelection(id: number) {
    const index = this.idsSeleccionados.indexOf(id);
    if (index > -1) {
      this.idsSeleccionados.splice(index, 1); // Deseleccionar
    } else {
      this.idsSeleccionados.push(id); // Seleccionar
    }
  }


  selectionClear() {
    this.idsSeleccionados = [];
  }
}