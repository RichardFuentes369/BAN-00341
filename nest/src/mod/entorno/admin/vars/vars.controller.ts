import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VarsService } from './vars.service';
import { CreateVarDto } from './dto/create-var.dto';
import { UpdateVarDto } from './dto/update-var.dto';

@Controller('vars')
export class VarsController {
  constructor(private readonly varsService: VarsService) {}

  @Post()
  create(@Body() createVarDto: CreateVarDto) {
    return this.varsService.create(createVarDto);
  }

  @Get()
  findAll() {
    return this.varsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.varsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVarDto: UpdateVarDto) {
    return this.varsService.update(+id, updateVarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.varsService.remove(+id);
  }
}
