import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LossService } from './loss.service';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';

@Controller('loss')
export class LossController {
  constructor(private readonly lossService: LossService) {}

  @Post()
  create(@Body() createLossDto: CreateLossDto) {
    return this.lossService.create(createLossDto);
  }

  @Get()
  findAll() {
    return this.lossService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lossService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLossDto: UpdateLossDto) {
    return this.lossService.update(+id, updateLossDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lossService.remove(+id);
  }
}
