import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import axios from 'axios';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';


@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  
  constructor(private translate: TranslateService) {}

  async getDataBrand(term: string = ''){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `brand/marcas-disponibles?search=${term}`
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'get',
      url: urlCopleta,
    })
  }

  async getDataProduct(id: string){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'product/obtener-producto/'
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'get',
      url: urlCopleta,
      params: {
        _id: id,
        lang: lang,
      }
    })
  }

  async createProduct(data: any){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'product/crear-producto/'
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'post',
      url: urlCopleta,
      data: data,
      params: {
        lang: lang,
      }
    })
  }

  async updateProduct(data: any, id: string){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `product/editar-producto`
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'patch',
      url: urlCopleta,
      data: data,
      params: {
        _id: id,
        lang: lang,
      }
    })
  }

  async deleteProduct(id: string[]){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'product/eliminar-producto/'
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'delete',
      url: urlCopleta,
      params: {
        _id: id.join(','),
        lang: lang,
      },
    })
  }

  async descargarPlantilla(id_categoria: number) {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    const urlCompleta = `${environment.apiUrl}product/plantilla-productos/`;
    const token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN);

    try {
      const response = await axios.get(urlCompleta, {
        headers: {
          [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        },
        params: { lang, id_categoria },
        responseType: 'blob' // CRÍTICO: Para manejar datos binarios
      });

      // Lógica para disparar la descarga en el navegador
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Nombre del archivo (puedes dinamizarlo con el lang)
      const fileName = lang === 'es' ? 'plantilla_productos.xlsx' : 'product_template.xlsx';
      link.setAttribute('download', fileName);
      
      document.body.appendChild(link);
      link.click();
      
      // Limpieza
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error descargando la plantilla', error);
      throw error;
    }
  }

  async cargarExcelProductos(file: File, idCategory: number) {
    const lang = this.translate.currentLang || 'es';
    const urlCompleta = `${environment.apiUrl}product/cargar-productos`;
    const token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN);

    const formData = new FormData();
    formData.append('file', file); 

    try {
      const response = await axios.post(urlCompleta, formData, {
        headers: {
          [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        },
        params: {
          id_category: idCategory, 
          lang: lang
        },
        timeout: 300000 
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenerTotale(){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'product/obtener-contadores-productos/'
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'get',
      url: urlCopleta,
      params: {
        lang: lang,
      }
    })
  }

}
