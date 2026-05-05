import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterWarehouseDto } from './dto/filter-warehouse.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

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
  @Post('crear-lote')
  create(
    @Query('lang') lang: string,
    @Body() batchData: CreateWarehouseDto,
    @GetUser('id') userId: number
  ) {
    return this.warehouseService.create(lang, batchData, userId);
  }

}
