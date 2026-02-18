import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { ocultarModalOscura } from '@function/System';
import { AuthService } from '@guard/service/auth.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { CategoriasService } from '@mod/catalog/admin/pages/categorias/service/categorias.service';

interface CategoriaInterface {
  'id': number,
  'nombre': string,
  'descripcion': string,
}

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.scss',
})
export class EditarCategoriaComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private categoriasService: CategoriasService,
    private userService :AuthService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  model = {
    id: '',
    nombre: '',
    descripcion: '',
  }

  validators = {
    nombre: false,
    descripcion: false,
  }

  categoria: CategoriaInterface[] = []
  categoriaReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    this.validators.nombre = (this.model.nombre.length === 0)
    this.validators.descripcion = (this.model.descripcion.length === 0)

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.descripcion) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nombre && !this.validators.descripcion
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.categoriaReal = await this.categoriasService.getDataCategory(this.route.snapshot.queryParams?.['id'])

    this.categoria.push(this.categoriaReal.data)

    this.model.id = this.categoriaReal.data.id
    this.model.nombre = this.categoriaReal.data.nombre
    this.model.descripcion = this.categoriaReal.data.descripcion
  }

  async actualizarData(){

    if(this.isFormValid){
      let endPoint = this.categoriasService
  
      await endPoint.updateCategory(
        {
          "nombre": this.model.nombre,
          "descripcion": this.model.descripcion,
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-catalog.CATEGORY.SWAL_ARE_YOU_SURE_UPDATE').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-catalog.CATEGORY.SWAL_UPDATED'),
            text: this.translate.instant('mod-catalog.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        })
      }).catch(async error => {
        this.ngOnInit()
        if(typeof(error.response.data.message) == 'string'){
          Swal.fire(error.response.data.message);
        }else{
          Swal.fire(error.response.data.message[0]);
        }
      })
    }

  }

}

