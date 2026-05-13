import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MermasService } from './mermas.service';
import { CreateMermaDto } from './dto/create-merma.dto';
import { UpdateMermaDto } from './dto/update-merma.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterRegistroMermaDto } from './dto/filter-merma.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('registro-mermas')
export class MermasController {
  constructor(private readonly mermasService: MermasService) {}

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
    return this.mermasService.update(
      lang, 
      +_id, 
      mermaData, 
      userId
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
    @Query('lang') lang:string,
  ) {
    return this.mermasService.contadoresRegistro(lang);
  }
}
