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
import { TipoService } from '@mod/merma/admin/pages/tipo/service/tipo.service';

interface TipoInterface {
  'id': number,
  'nombre': string,
}

@Component({
  selector: 'app-editar-tipo',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-tipo.component.html',
  styleUrl: './editar-tipo.component.scss',
})
export class EditarTipoMermaComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private tipoService: TipoService,
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
  }

  validators = {
    nombre: false,
  }

  tipo: TipoInterface[] = []
  tipoReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    this.validators.nombre = (this.model.nombre.trim().length === 0)

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nombre) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nombre
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.tipoReal = await this.tipoService.getDataTipo(this.route.snapshot.queryParams?.['id_tipo_merma'])

    this.tipo.push(this.tipoReal.data)

    this.model.id = this.tipoReal.data.id
    this.model.nombre = this.tipoReal.data.nombre
  }

  async actualizarData(){

    if(this.isFormValid){
      let endPoint = this.tipoService
  
      await endPoint.updateTipo(
        {
          "nombre": this.model.nombre,
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-merma.TYPE.SWAL_ARE_YOU_SURE_UPDATE').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-merma.TYPE.SWAL_UPDATED'),
            text: this.translate.instant('mod-merma.SWAL_UPDATED_RECORD'),
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
