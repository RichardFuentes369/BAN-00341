import { Module } from '@nestjs/common';
import { JsonService } from './json.service';
import { JsonController } from './json.controller';
import { jsonProviders } from './entities/json.provider';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [
    GlobalModule,
  ],  
  controllers: [JsonController],
  providers: [
    ...jsonProviders,
    JsonService
  ],
  exports: [
    JsonService,
  ]
})
export class JsonModule {}
