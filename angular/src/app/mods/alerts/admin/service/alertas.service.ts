import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {

  constructor(
    private http: HttpClient,
  ) { }


  descargarReporte(tipoendPoint: string, tipo: string, parametros: any): Observable<Blob> {
    const urlCompleta = `${environment.apiUrl}${tipoendPoint}/${tipo}`;
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

}
