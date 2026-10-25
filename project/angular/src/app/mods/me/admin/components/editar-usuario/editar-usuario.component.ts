import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { SettingsService } from '../../pages/settings/service/settings.service';

interface AdministradorInterface {
  'id': number,
  'firstName': string,
  'lastName': string,
  'email': string,
  'password': string,
  'isActive': number,
}

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private principalService :PrincipalService,
    private finalService: FinalService,
    private translate: TranslateService,
    private settingsService: SettingsService
  ) {
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  optionSelect = 0
  typefield = 'password'

  model = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: 0
  }

  validators = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    selectHas: false,
  }

  user: AdministradorInterface[] = []
  usuarioReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.firstName = (this.model.firstName.length === 0)
    this.validators.lastName = (this.model.lastName.length === 0)
    this.validators.email = (this.model.email.length === 0 || !regexEmail.test(this.model.email))
    this.validators.password = (this.model.password.length === 0)

    const boton = document.querySelector('.btnAction') as HTMLButtonElement
    (!this.validators.firstName && !this.validators.lastName && !this.validators.email && !this.validators.password) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.firstName && !this.validators.lastName && !this.validators.email && !this.validators.password
  }

  async ngOnInit() {
    this.user = []

    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH)
    const response = await this.principalService.getDataUser(userData.data.id)
    
    this.user.push(userData.data)

    this.model.id = response.data.id
    this.model.firstName = response.data.firstName
    this.model.lastName = response.data.lastName
    this.model.email = response.data.email
    this.model.password = response.data.password
    this.model.isActive = (response.data.isActive) ? 1 : 2
    this.optionSelect = (response.data.isActive) ? 1 : 2
  }

  showPassword(){
    this.typefield = (this.typefield === "password") ? "text" : "password"
  }

  async actualizarData(){

    if(this.isFormValid){
      let complemento = localStorage.getItem(STORAGE_KEY_PROFILE)
  
      await this.principalService.updateUser(
        {
          "firstName": this.model.firstName,
          "lastName": this.model.lastName,
          "email": this.model.email,
          "password": this.model.password,
          "isActive": (this.optionSelect == 1) ? true : false
        },
        this.model.id
      ).then((response) =>{
        this.translate.get('mod-users.SWAL_ARE_YOU_SURE_UPDATE_USER').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-users.SWAL_UPDATED'),
            text: this.translate.instant('mod-users.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        })

        this.settingsService.triggerRefresh();

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
