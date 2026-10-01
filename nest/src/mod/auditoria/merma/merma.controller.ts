import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MermaService } from './merma.service';
import { CreateAuditoriaMermaDto } from './dto/create-merma.dto';

@Controller('merma')
export class MermaController {
  constructor(private readonly mermaService: MermaService) {}

  @Post()
  create(@Body() createMermaDto: CreateAuditoriaMermaDto) {
    return this.mermaService.create(createMermaDto);
  }
}
