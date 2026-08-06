import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface AlertaInterface {
  'cantidad_comprada': number,
  'cantidad_en_bodega': number,
  'cantidad_vendida': number,
  'dias_restantes': string,
  'estado': string,
  'estado_alerta': string,
  'fecha_entrada': string,
  'fecha_vencimiento': string,
  'lote': string,
  'codigo_barra': string,
  'nombre_producto': string,
  'nombre_proveedor': string,
}

@Component({
  selector: 'app-ver-alerta',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ver-alerta.component.html',
  styleUrl: './ver-alerta.component.scss',
})
export class VerAlertaVComponent implements OnInit {

  // construcator
  constructor(
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) { }

  alerta: AlertaInterface[] = []
  permisos: any[] = []
  alertaReal: any

  cargandoSession: any = ''

  ngOnInit() {
    this.cargandoSession = sessionStorage.getItem('rowSelectedLazy')
    this.alerta.push(JSON.parse(this.cargandoSession))
  }

  formatearFecha(fecha: string | undefined): string {
    if (!fecha) return '';
    return fecha.split('T')[0];
  }

}

