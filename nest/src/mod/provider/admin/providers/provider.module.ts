import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { providerProviders } from './entities/provider.provider';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';

@Module({
  imports: [GlobalModule],
  controllers: [ProviderController],
  providers: [
    ...providerProviders,
    ProviderService
  ],
  exports: [
    ProviderService
  ]
})

export class AdminProviderModule {}
