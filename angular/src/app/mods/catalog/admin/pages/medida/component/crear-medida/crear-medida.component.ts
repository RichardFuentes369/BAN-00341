import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { MedidaService } from '../../service/medida.service';

@Component({
  selector: 'app-crear-medida',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-medida.component.html',
  styleUrl: './crear-medida.component.scss',
})
export class CrearMedidaComponent {

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private medidaService: MedidaService,
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
  }

  validators = {
    nombre: false,
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

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.nombre) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nombre
  }

  async crearMarca(){
    if(this.isFormValid){
      let endPoint = this.medidaService

      const response = await endPoint.createExtent(this.model)
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
          title: this.translate.instant('mod-catalog.EXTENT.SWAL_CREATED'),
          text: this.translate.instant('mod-catalog.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }
  }
}
