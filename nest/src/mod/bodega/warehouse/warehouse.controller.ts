import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Res } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterWarehouseDto } from './dto/filter-warehouse.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { FilterWarehouseProductDTO } from './dto/filter-lote-producto.dto';
import { Response } from 'express';

@Controller('batch')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get('obtener-registro-lotes')
  findAll(
    @Query('lang') lang: string,
    @Query() FilterWarehouseDto: FilterWarehouseDto,
    @GetUser('id') userId: number
  ) {
    return this.warehouseService.findAll(
      FilterWarehouseDto, 
      lang
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-registro-lote')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.warehouseService.findOne(
      lang, 
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-registro-lote-producto')
  findOneLoteProduct(
    @Query() filterWarehouseProductDTO: FilterWarehouseProductDTO,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.warehouseService.findOneLoteProduct(
      lang,
      filterWarehouseProductDTO
    );
  }

  @UseGuards(AdminGuard)
  @Patch('editar-registro-lote')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() warehouseData: UpdateWarehouseDto,
    @GetUser('id') userId: number
  ) {
    return this.warehouseService.update(
      lang, 
      +_id, 
      warehouseData, 
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-lote')
  create(
    @Query('lang') lang: string,
    @Body() batchData: CreateWarehouseDto,
    @GetUser('id') userId: number
  ) {
    return this.warehouseService.create(lang, batchData, userId);
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-registro-lote')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.warehouseService.remove(
      lang, 
      idsNumeros, 
      userId
    );
  }

  // contadores
  @Get('obtener-contadores-lote')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.warehouseService.contadoresLote(lang);
  }

  // reportes
  @Get('excel')
  async downloadExcel(
    @Query('lang') lang: string,
    @Query() columns: any,
    @GetUser('id') userId: number,
    @Res() res: Response
  ) {
    const buffer = await this.warehouseService.generarExcel(columns, lang);
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
    const csv = await this.warehouseService.generarCsv(columns, lang);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.csv');
    res.status(200).send(csv);
  }
}
