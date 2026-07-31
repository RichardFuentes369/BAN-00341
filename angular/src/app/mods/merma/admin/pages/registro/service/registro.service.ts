import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { toTimestampp } from '@function/System';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  async obtenerTotale(year: string, month: string) {
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'registro-mermas/obtener-contadores-registro-merma/'
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
        year: year,
        month: month,
        lang: lang,
      }
    })
  }

  async getDataRegister(id: string) {
    let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'registro-mermas/obtener-registro-merma/'
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

  async createRegister(data: any) {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'registro-mermas/crear-registro-merma/'
    let urlCopleta = environment.apiUrl + complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    data.fecha_reporte = toTimestampp(data.fecha_reporte)

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

  async updateRegister(data: any, id: string) {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = `registro-mermas/actualizar-registro-merma`
    let urlCopleta = environment.apiUrl + complemento
    let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)


    data.fecha_reporte = toTimestampp(data.fecha_reporte)


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

  async deleteRegister(id: string[]) {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    let complemento = 'registro-mermas/eliminar-registro-merma/'
    let urlCopleta = environment.apiUrl + complemento
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

  descargarReporte(tipo: string, parametros: any): Observable<Blob> {
    const urlCompleta = `${environment.apiUrl}registro-mermas/${tipo}`;
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

  async getDataList() {
    // let lang = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    // let complemento = 'extent/lista-unidad-de-medida/'
    // let urlCopleta = environment.apiUrl+complemento
    // let token = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN)

    // return await axios.request({
    //   headers: {
    //     [WORD_KEY_AUTHORIZATION_GLOBAL]: `${WORD_KEY_BEARER_GLOBAL} ${token}`,
    //     [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
    //   },
    //   method: 'get',
    //   url: urlCopleta,
    //   params: {
    //     lang: lang,
    //   }
    // })
  }
}

