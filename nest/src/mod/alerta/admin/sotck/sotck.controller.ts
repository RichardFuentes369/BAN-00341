import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { SotckService } from './sotck.service';
import { CreateSotckDto } from './dto/create-sotck.dto';
import { UpdateSotckDto } from './dto/update-sotck.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { Response } from 'express';

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
      query.limit,
      query.field,
      query.order,
      query.p_codigo_barra,
      query.p_nombre_producto,
      query.p_stock_min,
      query.p_stock_max,
      query.p_bodega_min,
      query.p_bodega_max,
      query.p_aviso_stock
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
    const buffer = await this.sotckService.generarExcel(columns, lang);
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
    const csv = await this.sotckService.generarCsv(columns, lang);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.csv');
    res.status(200).send(csv);
  }

}
