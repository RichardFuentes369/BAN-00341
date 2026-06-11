import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SotckService } from './sotck.service';
import { CreateSotckDto } from './dto/create-sotck.dto';
import { UpdateSotckDto } from './dto/update-sotck.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';

@Controller('alert-stock')
export class SotckController {
  constructor(private readonly sotckService: SotckService) { }

  @Get('reporte-stock-bodega')
  async permisosAsignados(
    @Query('lang') lang: string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    const reporte = await this.sotckService.findAll(
      query.page,
      query.limit
    )
    return reporte
  }

}
