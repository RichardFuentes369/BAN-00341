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
import { MedidaService } from '../../service/medida.service';

interface MedidaInterface {
  'id': string,
  'nombre': string,
}
@Component({
  selector: 'app-editar-medida',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-medida.component.html',
  styleUrl: './editar-medida.component.scss',
})
export class EditarMedidaComponent implements OnInit{
  
  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private medidaService: MedidaService,
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

  model: {
    id: string;
    nombre: string,
  } = {
    id: '',
    nombre: '',
  }
  
  validators = {
    id: false,
    nombre: false,
  }

  medida: MedidaInterface[] = []
  medidaReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    this.validators.nombre = (this.model.nombre.length === 0)

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nombre) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nombre
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.medidaReal = await this.medidaService.getDataExtent(this.route.snapshot.queryParams?.['id_extent'])

    this.medida.push(this.medidaReal.data)

    this.model.id = this.medidaReal.data.id
    this.model.nombre = this.medidaReal.data.nombre
  }

  async actualizarData(){

    if(this.isFormValid){
      let endPoint = this.medidaService
  
      await endPoint.updateExtent(
        {
          "nombre": this.model.nombre,
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-catalog.EXTENT.SWAL_ARE_YOU_SURE_UPDATE').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-catalog.EXTENT.SWAL_UPDATED'),
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
