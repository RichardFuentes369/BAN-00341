import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { ocultarModalOscura } from '@function/System';
import { AuthService } from '@guard/service/auth.service';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';
import { BodegaService } from '@mod/warehouse/admin/pages/warehouse/service/warehouse.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ScanService } from '@service/scan/scan.service';
import { debounceTime, map, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-globales-scanner13',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './scanner13.component.html',
  styleUrl: './scanner13.component.scss',
})
export class Scanner13Component implements OnInit {

  @Output() dataResultScanned = new EventEmitter<any>();
  @Output() clearData = new EventEmitter<any>();

  private validationSubject = new Subject<void>();
  isFormValid = false;
  permisos_catalogo_productos: any[] = []

  ultimoCodigoBarra = ''

  fielddBarCode: boolean = true

  constructor(
    private router: Router,
    private userService: AuthService,
    private permisosService: PermisosService,
    private productoService: ProductosService,
    private translate: TranslateService,
    private scanService: ScanService
  ) {
    this.validationSubject.pipe(
      debounceTime(300),
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;

      if (this.esCodigoValido) {
        this.ultimoCodigoBarra = this.producto.codigo_barra
        this.buscarProducto();
      }

      const regexNIT = /^[0-9]{8,15}$/;

      this.checkValidation();
    });
  }

  producto = {
    id: '',
    nombre: '',
    stock_minimo: '',
    codigo_barra: '',
    marca: '',
    unidad_medida: '',
    es_perecedero: ''
  }

  validators = {
    codigo_barra: false,
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo_catalogo = await this.permisosService.permisoPage(0, 'catalogo', userData.data.id)
    const permiso_submodulo_productos = await this.permisosService.permisoPage(22, 'productos', userData.data.id)


    if (permiso_modulo_catalogo.data === "" || permiso_submodulo_productos.data === "") {
      return
    }

    const permisos_productos = await this.permisosService.permisos(userData.data.id, 'productos')
    this.permisos_catalogo_productos = permisos_productos.data

    this.scanService.listenForScans().subscribe(data => {
      this.producto.codigo_barra = data;
      this.onInputChange()
    });
  }

  goTo(url: string, _id: number) {

    if (_id != 0) {
      this.router.navigate([url], { queryParams: { id: _id } });
    } else {
      this.router.navigate([url]);
    }

  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    let respuesta = false
    const regexBarCode = /^[0-9]{13}$/;
    const regexNIT = /^[0-9]{8,15}$/;
    this.validators.codigo_barra = (this.producto.codigo_barra === null || !regexBarCode.test((this.producto.codigo_barra as any).toString()))

    if (this.validators.codigo_barra) {
      this.btn_new_product = false
    } else {
      this.btn_new_product = true
    }

    return respuesta
  }

  get esCodigoValido(): boolean {
    const codigo = (this.producto?.codigo_barra || '').toString();
    const regex = /^\d{13}$/;
    return regex.test(codigo);
  }

  get longitudCodigo(): number {
    return (this.producto?.codigo_barra || '').toString().length;
  }

  btn_new_product = false

  puedoCrearProductos = false

  async ean13(option: number) {
    switch (option) {
      case 1:
        this.fielddBarCode = true
        this.onInputChange()
        break;
      case 2:
        this.fielddBarCode = false
        this.onInputChange()
        break;
      case 3:
        this.fielddBarCode = true
        this.onInputChange()
        this.producto.codigo_barra = ''

        this.clearData.emit()
        break;
    }
  }

  async buscarProducto() {
    try {
      const consultaProducto = await this.productoService.getDataProductForBarcode(this.producto.codigo_barra)
      if (consultaProducto.status == 200 && consultaProducto.data.estado === true) {
        this.producto.id = consultaProducto.data.id
        this.producto.nombre = consultaProducto.data.nombre
        this.producto.marca = consultaProducto.data.marca.nombre
        this.producto.unidad_medida = consultaProducto.data.medida.nombre
        this.producto.es_perecedero = consultaProducto.data.es_perecedero

        this.dataResultScanned.emit(this.producto)

        this.btn_new_product = false
      }
    } catch (error: any) {
      this.producto.id = ''
      this.dataResultScanned.emit(this.producto)
      if (this.permisos_catalogo_productos.find(obj => obj.permiso_permiso === 'crear') == undefined) {
        this.puedoCrearProductos = false
      } else {
        this.puedoCrearProductos = true
      }
    }
  }
}