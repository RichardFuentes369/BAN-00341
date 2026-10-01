import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { CreateAuditoriaBodegaDto } from './dto/create-bodega.dto';

@Controller('bodega')
export class BodegaController {
  constructor(private readonly bodegaService: BodegaService) {}

  @Post()
  create(@Body() createBodegaDto: CreateAuditoriaBodegaDto) {
    return this.bodegaService.create(createBodegaDto);
  }
}
