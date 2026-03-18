import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para [class.disabled]
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-cargar-producto',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule], // Añadido CommonModule
  templateUrl: './cargar-producto.component.html',
  styleUrl: './cargar-producto.component.scss',
})
export class CargarProductoComponent {

  private validationSubject = new Subject<void>();
  isFormValid = false;
  fileToUpload: File | null = null;

  validators = {
    archivo_valido: false,
    archivo_error_msj: ''
  };

  @Output() actualizarTabla = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
    } else {
      this.fileToUpload = null;
    }
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    
    if (!this.fileToUpload) {
      this.validators.archivo_valido = false;
      (this.validators.archivo_valido) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      this.validators.archivo_error_msj = 'El archivo es obligatorio';
      return false;
    }
    
    const extension = this.fileToUpload.name.split('.').pop()?.toLowerCase();
    if (extension !== 'xlsx') {
      this.validators.archivo_valido = false;
      (this.validators.archivo_valido) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      this.validators.archivo_error_msj = 'Solo se permiten archivos .xlsx';
      return false;
    }
    
    (!this.validators.archivo_valido) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    console.log(this.validators.archivo_valido)
    this.validators.archivo_error_msj = '';
    return true;
  }

  async descargarPlantilla(){
    let id_categoria = Number(this.route.snapshot.queryParams?.['id_category']);
    await this.productosService.descargarPlantilla(id_categoria);
  }

  async subirArchivo() {
    if (!this.isFormValid || !this.fileToUpload) return;

    let id_categoria = Number(this.route.snapshot.queryParams?.['id_category']);

    Swal.fire({
      title: 'Procesando archivo masivo...',
      text: 'Estamos validando e insertando los registros. Esto puede tardar un momento.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); 
      }
    });

    try {
      const res = await this.productosService.cargarExcelProductos(this.fileToUpload, id_categoria);
      
      Swal.close(); 

      ocultarModalOscura()
      
      await Swal.fire({
        title: this.translate.instant('mod-catalog.PRODUCT.SWAL_CREATED'),
        text: `${res.count} productos procesados correctamente.`,
        icon: "success"
      });

      this.actualizarTabla.emit(); 
      
      this.fileToUpload = null;
      this.isFormValid = false;

    } catch (error) {
      Swal.close();
      Swal.fire({
        title: 'Error',
        text: 'El servidor tardó demasiado o el archivo es muy pesado.',
        icon: "error"
      });
    }
  }

  goTo(url: string, _id: number){
    _id != 0 ? this.router.navigate([url], { queryParams: { id: _id } }) : this.router.navigate([url]);
  }
}