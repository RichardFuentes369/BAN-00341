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
interface RegistroInterface {
  'cantidad': number,
  'fecha_reporte': string,
  'id': number,
  'id_lote': {
    'cantidad_comprada': number,
    'cantidad_en_bodega': number,
    'cantidad_vendida': number,
    'estado': string,
    'fecha_entrada': string,
    'fecha_vencimiento': string,
    'id': number,
    'id_producto': {
      'alerta_amarilla': number,
      'alerta_naranja': number,
      'codigo_barra': string,
      'es_perecedero': number,
      'estado': number,
      'id': number,
      'id_marca': number,
      'id_medida': number,
      'medida': {
        'id': number,
        'nombre': string,
      },
      'nombre': string,
      'stock_minimo': number,
    },
    'lote': string,
  },
  'id_tipo_merma': {
    'id': number,
    'nombre': string,
  },
  'observacion': string,
  'valor_perdido': string
}

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

  registro: RegistroInterface[] = []
  permisos: any[] = []
  registroReal: any

  show_detail_batch = false

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.registroReal = await this.registroService.getDataRegister(this.route.snapshot.queryParams?.['id_tipo_merma'])

    this.registro.push(this.registroReal.data)
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
