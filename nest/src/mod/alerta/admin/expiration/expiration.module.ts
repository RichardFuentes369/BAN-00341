import { Module } from '@nestjs/common';
import { ExpirationService } from './expiration.service';
import { ExpirationController } from './expiration.controller';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [ExpirationController],
  providers: [ExpirationService],
})
export class ExpirationModule {}
