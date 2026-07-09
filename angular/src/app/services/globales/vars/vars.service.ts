import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root',
})
export class VarsService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}
  
  async obtenerVar(nombre: string): Promise<string> {
    let complemento = `var/getVar?name=${nombre}`
    let urlCopleta = environment.apiUrl+complemento

    return await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'get',
      url: urlCopleta
    })
  }

  async obtenerJson(nombre: string): Promise<any> {
    const complemento = `json/getJson?name=${nombre}`;
    const urlCompleta = environment.apiUrl + complemento;

    // Axios devuelve un objeto con un campo 'data' que contiene tu respuesta
    const response = await axios.request({
      headers: {
        [WORD_KEY_AUTHORIZATION_CONTENT_TYPE]: `${WORD_KEY_AUTHORIZATION_APPLICATION_TYPE}`
      },
      method: 'get',
      url: urlCompleta
    });

    // Retornamos solo lo que te interesa (el objeto dentro de .data)
    return response.data; 
  }
}
