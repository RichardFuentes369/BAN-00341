import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-registro-reporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteRegistroComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  // Variables directas para capturar la ruta
  yearRuta: string = '';
  monthRuta: string = '';

  complementoFiltro = ''

  model = {
    id: '',
    codigo_barra_producto: '',
    lote_producto: '',
    nombre_producto: '',
    tipo_merma: '',
    fecha_reporte: '',
    cantidad_afectada: '',
    valor_perdido: '',
    observacion: ''
    // Ya no necesitamos year ni month aquí dentro para evitar conflictos con el HTML
  }

  ngOnInit() {
    // Nos suscribimos y guardamos directamente el valor de la ruta
    this.route.queryParamMap.subscribe(queryParams => {
      this.yearRuta = queryParams.get('anho') || queryParams.get('year') || '';
      this.monthRuta = queryParams.get('month') || '';
    });
  }

  limpiar() {
    this.model.id = '';
    this.model.codigo_barra_producto = '';
    this.model.lote_producto = '';
    this.model.nombre_producto = '';
    this.model.tipo_merma = '';
    this.model.fecha_reporte = '';
    this.model.cantidad_afectada = '';
    this.model.valor_perdido = '';
    this.model.observacion = '';
    // Al limpiar, las variables de la ruta se mantienen intactas porque vienen de la URL
  }

  generar(formato: 'excel' | 'csv') {
    this.complementoFiltro = '';

    if (this.model.id != '') {
      this.complementoFiltro += `&id=${this.model.id}`;
    }
    if (this.model.lote_producto != '') {
      this.complementoFiltro += `&lote_producto=${this.model.lote_producto}`;
    }
    if (this.model.codigo_barra_producto != '') {
      this.complementoFiltro += `&codigo_barra_producto=${this.model.codigo_barra_producto}`;
    }
    if (this.model.nombre_producto != '') {
      this.complementoFiltro += `&nombre_producto=${this.model.nombre_producto}`;
    }
    if (this.model.tipo_merma != '') {
      this.complementoFiltro += `&tipo_merma=${this.model.tipo_merma}`;
    }
    if (this.model.fecha_reporte != '') {
      this.complementoFiltro += `&fecha_reporte=${this.model.fecha_reporte}`;
    }
    if (this.model.cantidad_afectada != '') {
      this.complementoFiltro += `&cantidad_afectada=${this.model.cantidad_afectada}`;
    }
    if (this.model.valor_perdido != '') {
      this.complementoFiltro += `&valor_perdido=${this.model.valor_perdido}`;
    }
    if (this.model.observacion != '') {
      this.complementoFiltro += `&observacion=${this.model.observacion}`;
    }

    // LECTURA DIRECTA DE LA RUTA AL MOMENTO DE CLIC (Evita desfases asíncronos)
    const anhoUrl = this.route.snapshot.queryParamMap.get('anho') || this.route.snapshot.queryParamMap.get('year') || '';
    const mesUrl = this.route.snapshot.queryParamMap.get('month') || '';

    if (anhoUrl) {
      this.complementoFiltro += `&year=${anhoUrl}`;
    }
    if (mesUrl) {
      this.complementoFiltro += `&month=${mesUrl}`;
    }

    $(".complementoRuta").val(this.complementoFiltro);
  }
}