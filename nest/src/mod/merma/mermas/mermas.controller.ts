import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Res } from '@nestjs/common';
import { MermasService } from './mermas.service';
import { CreateMermaDto } from './dto/create-merma.dto';
import { UpdateMermaDto } from './dto/update-merma.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterRegistroMermaDto } from './dto/filter-merma.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { WarehouseService } from '@module/bodega/warehouse/warehouse.service';
import { Response } from 'express';

@Controller('registro-mermas')
export class MermasController {
  constructor(
    private readonly mermasService: MermasService,
    private readonly warehouseService: WarehouseService,
  ) { }

  @Get('obtener-registro-mermas')
  findAll(
    @Query('lang') lang: string,
    @Query() FilterRegistroMermaDto: FilterRegistroMermaDto,
    @GetUser('id') userId: number
  ) {
    return this.mermasService.findAll(
      FilterRegistroMermaDto,
      lang
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-registro-merma')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.mermasService.findOne(
      lang,
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-registro-merma')
  create(
    @Query('lang') lang: string,
    @Body() mermaData: CreateMermaDto,
    @GetUser('id') userId: number
  ) {
    return this.mermasService.create(
      lang,
      mermaData,
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Patch('actualizar-registro-merma')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() mermaData: UpdateMermaDto,
    @GetUser('id') userId: number
  ) {
    return this.warehouseService.updateQuantities(
      mermaData,
      2,
      +_id,
    );
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-registro-merma')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.mermasService.remove(
      lang,
      idsNumeros,
      userId
    );
  }

  // contadores
  @Get('obtener-contadores-registro-merma')
  async contadores(
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('lang') lang: string,
  ) {
    return this.mermasService.contadoresRegistro(year, month, lang);
  }

  @Get('obtener-historico-registro-mermas')
  findHistory(
    @Query('lang') lang: string,
    @Query() FilterRegistroMermaDto: FilterRegistroMermaDto,
    @GetUser('id') userId: number
  ) {
    return this.mermasService.findHistory(
      FilterRegistroMermaDto,
      lang
    );
  }

  @Get('obtener-periodo-meses')
  findHistoryMonth(
    @Query('lang') lang: string,
    @Query() FilterRegistroMermaDto: FilterRegistroMermaDto,
    @GetUser('id') userId: number
  ) {
    return this.mermasService.findHistoryMonth(
      FilterRegistroMermaDto,
      lang
    );
  }

  // reportes
  @Get('excel')
  async downloadExcel(
    @Query('lang') lang: string,
    @Query() columns: any,
    @GetUser('id') userId: number,
    @Res() res: Response
  ) {
    console.log(columns)
    const buffer = await this.mermasService.generarExcel(columns, lang);
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
    const csv = await this.mermasService.generarCsv(columns, lang);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.csv');
    res.status(200).send(csv);
  }
}
