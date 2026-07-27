import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Res } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterBrandDto } from './dto/filter-category.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { Response } from 'express';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Get('obtener-marcas')
  findAll(
    @Query('lang') lang: string,
    @Query() FilterBrandDto: FilterBrandDto,
    @GetUser('id') userId: number
  ) {
    return this.brandService.findAll(
      FilterBrandDto,
      lang
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-marca')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.brandService.findOne(
      lang,
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-marca')
  create(
    @Query('lang') lang: string,
    @Body() brandData: CreateBrandDto,
    @GetUser('id') userId: number
  ) {
    return this.brandService.create(
      lang,
      brandData,
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Patch('editar-marca')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() brandData: UpdateBrandDto,
    @GetUser('id') userId: number
  ) {
    return this.brandService.update(
      lang,
      +_id,
      brandData,
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-marca')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.brandService.remove(
      lang,
      idsNumeros,
      userId
    );
  }

  @Get('marcas-disponibles')
  async getBrandsList(@Query('search') search: string) {
    return await this.brandService.listaMarcas(search);
  }

  // contadores
  @Get('obtener-contadores-marcas')
  async contadores(
    @Query('lang') lang: string,
  ) {
    return this.brandService.contadoresMarcas(lang);
  }

  // reportes
  @Get('excel')
  async downloadExcel(
    @Query('lang') lang: string,
    @Query() columns: any,
    @GetUser('id') userId: number,
    @Res() res: Response
  ) {
    const buffer = await this.brandService.generarExcel(columns, lang);
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
    const csv = await this.brandService.generarCsv(columns, lang);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.csv');
    res.status(200).send(csv);
  }
}
