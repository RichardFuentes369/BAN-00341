import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import * as path from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GlobalModule } from './global/global.module';
import { MongooseModule } from '@nestjs/mongoose';

import { 
  AuthadminModule, 
  AdminUserModule,
  UserModule, 
  AuthuserModule,
  AsignacionModule,
  ModulosModule,
  ProductModule,
  SupplierModule,
  TiposModule,
  MermasModule,
  WarehouseModule,
  SalesModule,
  BrandModule,
  ExtentModule,
  SotckModule,
  ExpirationModule,
  VarModule,
  JsonModule
} from './mod/index'
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB), 

    I18nModule.forRoot({
      fallbackLanguage: process.env.FALLBACK_LANG,
      loaderOptions: {
        path: path.join(__dirname, 'assets/i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang']), 
      ],
      typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
    }),

    GlobalModule, 
    AuthadminModule,
    AdminUserModule,
    UserModule,
    AuthuserModule,
    ModulosModule,
    AsignacionModule,
    ProductModule,
    SupplierModule,
    WarehouseModule,
    SalesModule,
    TiposModule,
    MermasModule,
    BrandModule,
    ExtentModule,
    SotckModule,
    ExpirationModule,
    VarModule,
    JsonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppGateway,
  ],
})
export class AppModule {

  constructor(){
    // console.log(__dirname, '/i18n/es')
    // console.log(process.env)
  }

}
