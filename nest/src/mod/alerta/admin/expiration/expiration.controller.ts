import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExpirationService } from './expiration.service';
import { CreateExpirationDto } from './dto/create-expiration.dto';
import { UpdateExpirationDto } from './dto/update-expiration.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';

@Controller('alert-expiration')
export class ExpirationController {
  constructor(private readonly expirationService: ExpirationService) {}

  @Get('reporte-stock-vencimiento')
  async permisosAsignados(
    @Query('lang') lang: string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    const reporte = await this.expirationService.findAll(
      query.page,
      query.limit,
      query.field,
      query.order,
    )
    return reporte
  }  

}
