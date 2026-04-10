import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BatchService } from './batch.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterBatchDto } from './dto/filter-batch.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Get('obtener-registro-lotes')
  findAll(
    @Query('lang') lang: string,
    @Query() FilterBatchDto: FilterBatchDto,
    @GetUser('id') userId: number
  ) {
    return this.batchService.findAll(
      FilterBatchDto, 
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
    return this.batchService.findOne(
      lang, 
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-lote')
  create(
    @Query('lang') lang: string,
    @Body() batchData: CreateBatchDto,
    @GetUser('id') userId: number
  ) {
    return this.batchService.create(lang, batchData, userId);
  }

}
