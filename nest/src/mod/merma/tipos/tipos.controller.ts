import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { FilterTipoMermarDto } from './dto/filter-tipo.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('tipos_merma')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

 @Get('obtener-tipo-mermas')
  findAll(
    @Query('lang') lang: string,
    @Query() FilterTipoMermarDto: FilterTipoMermarDto,
    @GetUser('id') userId: number
  ) {
    return this.tiposService.findAll(
      FilterTipoMermarDto, 
      lang
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-tipo-merma')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.tiposService.findOne(
      lang, 
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-tipo-merma')
  create(
    @Query('lang') lang: string,
    @Body() tipomermaData: CreateTipoDto,
    @GetUser('id') userId: number
  ) {
    return this.tiposService.create(
      lang, 
      tipomermaData, 
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Patch('editar-tipo-merma')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() tipomermaData: UpdateTipoDto,
    @GetUser('id') userId: number
  ) {
    return this.tiposService.update(
      lang, 
      +_id, 
      tipomermaData, 
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-tipo-merma')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.tiposService.remove(
      lang, 
      idsNumeros, 
      userId
    );
  }

  // contadores
  @Get('obtener-contadores-tipo-merma')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.tiposService.contadoresTipo(lang);
  }
}
