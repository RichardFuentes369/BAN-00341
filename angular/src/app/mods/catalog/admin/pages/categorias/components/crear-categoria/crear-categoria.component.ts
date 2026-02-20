import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';
import { STORAGE_KEY_PROFILE } from '@const/app.const';
import { CategoriasService } from '../../service/categorias.service';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.scss',
})
export class CrearCategoriaComponent {

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private categoriasService: CategoriasService,
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
    nombre: '',
    descripcion: '',
  }

  validators = {
    nombre: false,
    descripcion: false,
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    this.validators.nombre = (this.model.nombre.trim().length === 0)
    this.validators.descripcion = (this.model.descripcion.trim().length === 0)

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.descripcion) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nombre && !this.validators.descripcion
  }

  async crearCategoria(){
    if(this.isFormValid){
      let endPoint = this.categoriasService

      const response = await endPoint.createCategory(this.model)
      if(response.data.status == 404){
        ocultarModalOscura()
        Swal.fire({
          title: response.data.message,
          text: response.data.error,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      if(response.data.status == 200){
        ocultarModalOscura()
        Swal.fire({
          title: this.translate.instant('mod-catalog.CATEGORY.SWAL_CREATED'),
          text: this.translate.instant('mod-catalog.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }
  }
}
