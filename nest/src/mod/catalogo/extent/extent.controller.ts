import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExtentService } from './extent.service';
import { FilterExtentDto } from './dto/filter-extent.dto';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { AdminGuard } from '@guard/admin/admin.guard';
import { CreateExtentDto } from './dto/create-extent.dto';
import { UpdateExtentDto } from './dto/update-extent.dto';

@Controller('extent')
export class ExtentController {
  constructor(private readonly extentService: ExtentService) {}

  @Get('obtener-unidades-de-medida')
  findAll(
    @Query('lang') lang: string,
    @Query() FilterBrandDto: FilterExtentDto,
    @GetUser('id') userId: number
  ) {
    return this.extentService.findAll(
      FilterBrandDto, 
      lang
    );
  }

  @Get('lista-unidad-de-medida')
  findList(
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.extentService.findAllList(
      lang
    );
  }


  @UseGuards(AdminGuard)
  @Get('obtener-unidad-de-medida')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.extentService.findOne(
      lang, 
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-unidad-de-medida')
  create(
    @Query('lang') lang: string,
    @Body() extentData: CreateExtentDto,
    @GetUser('id') userId: number
  ) {
    return this.extentService.create(
      lang, 
      extentData, 
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Patch('editar-unidad-de-medida')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() extentData: UpdateExtentDto,
    @GetUser('id') userId: number
  ) {
    return this.extentService.update(
      lang, 
      +_id, 
      extentData, 
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-unidad-de-medida')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.extentService.remove(
      lang, 
      idsNumeros, 
      userId
    );
  }

  // contadores
  @Get('obtener-contadores-unidad-de-medida')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.extentService.contadoresExtent(lang);
  }

}
