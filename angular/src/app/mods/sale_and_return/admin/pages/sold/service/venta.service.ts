import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import axios from 'axios';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class VentaService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { }


  async getDataSold(id: string) {
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/obtener-usuario-administrador/'
    let urlCopleta = environment.apiUrl + complemento
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

  async obtenerTotale() {
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/obtener-contadores-usuarios-administradores/'
    let urlCopleta = environment.apiUrl + complemento
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
