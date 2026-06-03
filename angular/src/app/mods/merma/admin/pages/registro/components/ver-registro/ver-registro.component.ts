import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { Permisos } from '@function/System'
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { RegistroService } from '../../service/registro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-ver-registro',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule  ],
  templateUrl: './ver-registro.component.html',
  styleUrl: './ver-registro.component.scss',
})
export class VerRegistroComponent {

  isLoading: boolean = false
  isReadonly:boolean = false

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private registroService :RegistroService,
  ) { }

  permisos: any[] = []
  registroReal: any

  show_detail_batch = false

  producto = {
    codigo_barra: '',
    nombre: '',
    marca: '',
    es_perecedero: '',
    unidad_medida: ''
  }

  lote = {
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    estado: ''
  }

  registro = {
    id_tipo_merma: '',
    cantidad: '',
    fecha_reporte: '',
    valor_perdido: '',
    observacion: '',
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.registroReal = await this.registroService.getDataRegister(this.route.snapshot.queryParams?.['id_merma'])

    this.producto.codigo_barra = this.registroReal.data.id_lote.id_producto.codigo_barra
    this.producto.nombre = this.registroReal.data.id_lote.id_producto.nombre
    this.producto.marca  = this.registroReal.data.id_lote.id_producto.marca.nombre
    this.producto.marca  = this.registroReal.data.id_lote.id_producto.es_perecedero
    this.producto.unidad_medida  = this.registroReal.data.id_lote.id_producto.medida.nombre

    this.lote.lote  = this.registroReal.data.id_lote.lote
    this.lote.fecha_entrada  = this.formatoFecha(this.registroReal.data.id_lote.fecha_entrada)
    this.lote.fecha_vencimiento  = this.formatoFecha(this.registroReal.data.id_lote.fecha_vencimiento)
    this.lote.estado  = this.registroReal.data.id_lote.estado

    this.registro.id_tipo_merma  = this.registroReal.data.id_tipo_merma.nombre
    this.registro.cantidad  = this.registroReal.data.cantidad
    this.registro.fecha_reporte  = this.formatoFecha(this.registroReal.data.fecha_reporte)
    this.registro.valor_perdido  = this.registroReal.data.valor_perdido
    this.registro.observacion  = this.registroReal.data.observacion

  }

  formatoFecha(fecha: number){
    const date = new Date(Number(fecha) * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`
  }

  mostrarSeccion = {
    productSeccion: true,
    batchSeccion: true,
    registerSeccion: true,
  }

  toogleSection(sectionActive: string){
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
    }
  }

}
