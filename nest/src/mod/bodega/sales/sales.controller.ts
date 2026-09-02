import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterSaleDto } from './dto/filter-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  // @UseGuards(AdminGuard)
  @Get('obtener-registro-ventas')
  findAll(
    @Query('lang') lang: string,
    @Query() filterSaleDto: FilterSaleDto,
    @GetUser('id') userId: number
  ) {
    return this.salesService.findAll(
      filterSaleDto,
      lang
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-registro-venta')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.salesService.findOne(
      lang,
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-venta')
  create(
    @Query('lang') lang: string,
    @Body() saleData: CreateSaleDto,
    @GetUser('id') userId: number
  ) {
    return this.salesService.create(lang, saleData, userId);
  }
}
