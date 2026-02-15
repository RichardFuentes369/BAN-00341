import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MermasService } from './mermas.service';
import { CreateMermaDto } from './dto/create-merma.dto';
import { UpdateMermaDto } from './dto/update-merma.dto';

@Controller('mermas')
export class MermasController {
  constructor(private readonly mermasService: MermasService) {}

  @Post()
  create(@Body() createMermaDto: CreateMermaDto) {
    return this.mermasService.create(createMermaDto);
  }

  @Get()
  findAll() {
    return this.mermasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mermasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMermaDto: UpdateMermaDto) {
    return this.mermasService.update(+id, updateMermaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mermasService.remove(+id);
  }
}
