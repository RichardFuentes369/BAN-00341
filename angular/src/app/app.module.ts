import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Paquete para peticiones http
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

// Paquete para traducción
import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {
  ModuleTranslateLoader,
  IModuleTranslationOptions
} from '@larscom/ngx-translate-module-loader';

// Paquete para formularios
import { FormsModule } from '@angular/forms';

// Configuración de rutas
import { AppRoutingModule } from './app-routing.module';

// Plantillas
import { AppComponent } from './app.component';

export function createTranslateLoader(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';
  const options: IModuleTranslationOptions = {
    modules: [
      // inicio globales
      { baseTranslateUrl, moduleName: 'components/globales/breadcrumb', namespace: 'global-breadcrumb' },
      { baseTranslateUrl, moduleName: 'components/globales/idioma', namespace: 'global-idioma' },
      { baseTranslateUrl, moduleName: 'components/globales/loading', namespace: 'global-loading' },
      { baseTranslateUrl, moduleName: 'components/globales/login', namespace: 'global-login' },
      { baseTranslateUrl, moduleName: 'components/globales/card', namespace: 'global-card' },
      { baseTranslateUrl, moduleName: 'components/globales/search', namespace: 'global-search' },
      { baseTranslateUrl, moduleName: 'components/globales/report', namespace: 'global-report' },
      { baseTranslateUrl, moduleName: 'components/globales/modal', namespace: 'global-modal' },
      { baseTranslateUrl, moduleName: 'components/globales/notfound', namespace: 'global-notfound' },
      { baseTranslateUrl, moduleName: 'components/globales/tablecrud', namespace: 'global-tablecrud' },
      { baseTranslateUrl, moduleName: 'components/globales/dropzone', namespace: 'global-dropzone' },
      { baseTranslateUrl, moduleName: 'components/globales/permission', namespace: 'global-permission' },
      { baseTranslateUrl, moduleName: 'components/globales/colormode', namespace: 'global-colormode' },
      { baseTranslateUrl, moduleName: 'components/globales/gridcrud', namespace: 'global-gridcrud' },
      // fin globales

      // inicio layout
      { baseTranslateUrl, moduleName: 'layout/home', namespace: 'layout-home' },
      { baseTranslateUrl, moduleName: 'layout/admin', namespace: 'layout-admin' },
      { baseTranslateUrl, moduleName: 'layout/final', namespace: 'layout-final' },
      // fin layout

      // inicio modulos
      { baseTranslateUrl, moduleName: 'mods/main', namespace: 'mod-main'},
      { baseTranslateUrl, moduleName: 'mods/me', namespace: 'mod-me'},
      { baseTranslateUrl, moduleName: 'mods/users', namespace: 'mod-users'},
      { baseTranslateUrl, moduleName: 'mods/modules', namespace: 'mod-modules'},
      { baseTranslateUrl, moduleName: 'mods/catalog', namespace: 'mod-catalog'},
      { baseTranslateUrl, moduleName: 'mods/merma', namespace: 'mod-merma'},
      { baseTranslateUrl, moduleName: 'mods/stock', namespace: 'mod-stock'},
      { baseTranslateUrl, moduleName: 'mods/warehouse', namespace: 'mod-warehouse'},
      { baseTranslateUrl, moduleName: 'mods/alerts', namespace: 'mod-alerts'},
      { baseTranslateUrl, moduleName: 'mods/vars', namespace: 'mod-vars'},
      { baseTranslateUrl, moduleName: 'mods/custom', namespace: 'mod-custom'},
      // fin modulos
    ]
  };
  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration() // Si lo estás usando
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
