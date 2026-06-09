import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { MedidaService } from '../../service/medida.service';

interface MedidaInterface {
  'id': number,
  'nombre': string,
}

@Component({
  selector: 'app-ver-medida',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ver-medida.component.html',
  styleUrl: './ver-medida.component.scss',
})
export class VerMedidaComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private medidaService :MedidaService,
  ) { }

  medida: MedidaInterface[] = []
  permisos: any[] = []
  medidaReal: any

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.medidaReal = await this.medidaService.getDataExtent(this.route.snapshot.queryParams?.['id_extent'])

    this.medida.push(this.medidaReal.data)
  }

}
