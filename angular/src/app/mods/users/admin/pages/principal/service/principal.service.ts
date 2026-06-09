import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import axios from 'axios';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  async getDataUser(id: string){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/obtener-usuario-administrador/'
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

  async createUser(data: any){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/crear-usuario-admininistrador/'
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
      },
    })
  }

  async updateUser(data: any, id: string){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `admin/editar-usuario-administrador`
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

  async updateStatusUser(id: string[], option: string){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/actualizar-estado-admininistrador/'
    let urlCopleta = environment.apiUrl+complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    let data = {
      'id': id,
      'option': option,
    }

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'patch',
      url: urlCopleta,
      data: data,
      params: {
        lang: lang,
      }
    })
  }

  async deleteUser(id: string[]){
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/eliminar-usuario-admininistrador/'
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
      }
    })
  }

  descargarReporte(tipo: string, parametros: any): Observable<Blob> {
    const urlCompleta = `${environment.apiUrl}admin/${tipo}`;
    const token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN);

    const headers = new HttpHeaders({
      [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
      'Accept': tipo === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/csv'
    });

    return this.http.get(urlCompleta, {
      headers: headers,
      params: parametros,
      responseType: 'blob'
    });
  }

  async obtenerTotale(){
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'admin/obtener-contadores-usuarios-administradores/'
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



