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

}
