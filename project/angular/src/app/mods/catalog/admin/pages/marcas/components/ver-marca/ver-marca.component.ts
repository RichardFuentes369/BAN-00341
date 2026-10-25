import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { MarcaService } from '../../service/marca.service';

interface MarcaInterface {
  'id': number,
  'nombre': string,
}

@Component({
  selector: 'app-ver-marca',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ver-marca.component.html',
  styleUrl: './ver-marca.component.scss',
})
export class VerMarcaComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private marcaService :MarcaService,
  ) { }

  marca: MarcaInterface[] = []
  permisos: any[] = []
  marcaReal: any

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.marcaReal = await this.marcaService.getDataBrand(this.route.snapshot.queryParams?.['id_brand'])

    this.marca.push(this.marcaReal.data)
  }

}
