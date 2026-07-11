import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-warehouse-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroWarehouseComponent implements OnInit {

  complementoFiltro = ''

  model = {
    // email: '',
    // firstName: '',
    // lastName: '',
    // isActive: '',
    field: '',
    order: ''
  }

  async ngOnInit() {
    this.model = {
      // email: sessionStorage.getItem('email') || '',
      // firstName: sessionStorage.getItem('firstName') || '',
      // lastName: sessionStorage.getItem('lastName') || '',
      // isActive: sessionStorage.getItem('isActive') || '',
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || ''
    }

    this.complementoFiltro = ''
    // if(this.model.email != ''){
    //   this.complementoFiltro += `&email=${this.model.email}`
    // }
    // if(this.model.firstName != ''){
    //   this.complementoFiltro += `&firstName=${this.model.firstName}`
    // }
    // if(this.model.lastName != ''){
    //   this.complementoFiltro += `&lastName=${this.model.lastName}`      
    // }
    // if(this.model.isActive != ''){
    //   this.complementoFiltro += `&isActive=${this.model.isActive}`      
    // }
    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    // this.model.email = ''
    // this.model.firstName = ''
    // this.model.lastName = ''
    // this.model.isActive = ''
    this.model.field = ''
    this.model.order = ''

    // sessionStorage.removeItem('email')
    // sessionStorage.removeItem('firstName')
    // sessionStorage.removeItem('lastName')
    // sessionStorage.removeItem('isActive')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    // sessionStorage.removeItem('email')
    // sessionStorage.removeItem('firstName')
    // sessionStorage.removeItem('lastName')
    // sessionStorage.removeItem('isActive')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    // if(this.model.email != ''){
    //   this.complementoFiltro += `&email=${this.model.email}`
    //   sessionStorage.setItem('email', this.model.email)
    // }
    // if(this.model.firstName != ''){
    //   this.complementoFiltro += `&firstName=${this.model.firstName}`
    //   sessionStorage.setItem('firstName', this.model.firstName)
    // }
    // if(this.model.lastName != ''){
    //   this.complementoFiltro += `&lastName=${this.model.lastName}`      
    //   sessionStorage.setItem('lastName', this.model.lastName)
    // }
    // if(this.model.isActive != ''){
    //   this.complementoFiltro += `&isActive=${this.model.isActive}`      
    //   sessionStorage.setItem('isActive', this.model.isActive)
    // }
    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
      sessionStorage.setItem('field', this.model.field)
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
      sessionStorage.setItem('order', this.model.order)
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}
