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
import { MarcaService } from '../../service/marca.service';

interface MarcaInterface {
  'id': string,
  'nombre': string,
}
@Component({
  selector: 'app-editar-marca',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-marca.component.html',
  styleUrl: './editar-marca.component.scss',
})
export class EditarMarcaComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private marcaService: MarcaService,
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

  marca: MarcaInterface[] = []
  marcaReal: any

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
    this.marcaReal = await this.marcaService.getDataBrand(this.route.snapshot.queryParams?.['id_brand'])

    this.marca.push(this.marcaReal.data)

    this.model.id = this.marcaReal.data.id
    this.model.nombre = this.marcaReal.data.nombre
  }

  async actualizarData(){

    if(this.isFormValid){
      let endPoint = this.marcaService
  
      await endPoint.updateBrand(
        {
          "nombre": this.model.nombre,
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-catalog.BRAND.SWAL_ARE_YOU_SURE_UPDATE').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-catalog.BRAND.SWAL_UPDATED'),
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
