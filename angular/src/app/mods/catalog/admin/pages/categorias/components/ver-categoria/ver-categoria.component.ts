import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CategoriasService } from '@mod/catalog/admin/pages/categorias/service/categorias.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { Permisos } from '@function/System'
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';

interface CategoriaInterface {
  'id': number,
  'nombre': string,
  'descripcion': string,
}

@Component({
  selector: 'app-ver-categoria',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ver-categoria.component.html',
  styleUrl: './ver-categoria.component.scss',
})
export class VerCategoriaComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private categoriasService :CategoriasService,
  ) { }

  categoria: CategoriaInterface[] = []
  permisos: any[] = []
  categoriaReal: any

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.categoriaReal = await this.categoriasService.getDataCategory(this.route.snapshot.queryParams?.['id'])

    this.categoria.push(this.categoriaReal.data)
  }

}
