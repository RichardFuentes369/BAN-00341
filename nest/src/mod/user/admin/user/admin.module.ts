import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { userProviders } from './entities/admin.provider';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AsignacionModule } from '../permission/asignacion/asignacion.module';

@Module({
  imports: [
    GlobalModule,
    AsignacionModule
  ],
  controllers: [AdminController],
  providers: [
    ...userProviders,
    AdminService
  ],
  exports: [
    AdminService
  ]
})
export class AdminUserModule {}
