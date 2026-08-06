import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ExpirationService } from './expiration.service';
import { CreateExpirationDto } from './dto/create-expiration.dto';
import { UpdateExpirationDto } from './dto/update-expiration.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { Response } from 'express';

@Controller('alert-expiration')
export class ExpirationController {
  constructor(private readonly expirationService: ExpirationService) { }

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
      query.p_lote,
      query.p_codigo_barra,
      query.p_nombre_producto,
      query.p_cantidad_comprada_min,
      query.p_cantidad_comprada_max,
      query.p_cantidad_vendida_min,
      query.p_cantidad_vendida_max,
      query.p_cantidad_bodega_min,
      query.p_cantidad_bodega_max,
      query.p_dias_restantes_min,
      query.p_dias_restantes_max,
      query.p_fecha_entrada_min,
      query.p_fecha_entrada_max,
      query.p_fecha_vencimiento_min,
      query.p_fecha_vencimiento_max
    )
    return reporte
  }

  // reportes
  @Get('excel')
  async downloadExcel(
    @Query('lang') lang: string,
    @Query() columns: any,
    @GetUser('id') userId: number,
    @Res() res: Response
  ) {
    const buffer = await this.expirationService.generarExcel(columns, lang);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
    res.send(buffer);
  }

  @Get('csv')
  async downloadCsv(
    @Query('lang') lang: string,
    @Query() columns: any,
    @GetUser('id') userId: number,
    @Res() res: Response
  ) {
    const csv = await this.expirationService.generarCsv(columns, lang);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.csv');
    res.status(200).send(csv);
  }

}
