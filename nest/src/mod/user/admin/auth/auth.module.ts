import { Module } from '@nestjs/common';
import { AuthadminService } from './auth.service';
import { AuthadminController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@guard/secret_key';

import { AdminUserModule } from '@module/user/admin/user/admin.module';

@Module({
  imports: [
    AdminUserModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretAdmin,
      signOptions: { expiresIn: jwtConstants.TOKEN_TIME },
    }),
  ],
  controllers: [AuthadminController],
  providers: [AuthadminService],
  exports: [AuthadminService],
})
export class AuthadminModule {}
