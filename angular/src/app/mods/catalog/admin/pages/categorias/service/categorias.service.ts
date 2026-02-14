import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import axios from 'axios';
import { STORAGE_KEY_TOKEN_ADMIN, WORD_KEY_AUTHORIZATION_APPLICATION_TYPE, WORD_KEY_AUTHORIZATION_CONTENT_TYPE, WORD_KEY_AUTHORIZATION_GLOBAL, WORD_KEY_BEARER_GLOBAL } from '@const/app.const';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private translate: TranslateService) {}

}



