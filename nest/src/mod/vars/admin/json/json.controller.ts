import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JsonService } from './json.service';
import { CreateJsonDto } from './dto/create-json.dto';
import { UpdateJsonDto } from './dto/update-json.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { PaginationDto } from '@global/dto/pagination.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('json')
export class JsonController {
  constructor(private readonly jsonService: JsonService) { }

  @ApiTags('vars_json')
  @Get('obtener-vars-json')
  findPaginada(
    @Query('lang') lang: string,
    @Query() paginationDto: PaginationDto,
    @GetUser('id') userId: number
  ) {
    return this.jsonService.findPaginada(
      lang,
      paginationDto
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-var-json')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.jsonService.findOne(
      lang,
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-var-json')
  create(
    @Query('lang') lang:string,
    @Body() createVar: CreateJsonDto,
    @GetUser('id') userId: number
  ) {
    return this.jsonService.create(
      lang,
      createVar,
      userId
    );
  }

  // contadores
  @Get('obtener-contadores-json')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.jsonService.contadorVariables(lang);
  }
}
