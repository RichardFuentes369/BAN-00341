import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { VarService } from './var.service';
import { CreateVarDto } from './dto/create-var.dto';
import { UpdateVarDto } from './dto/update-var.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { PaginationDto } from '@global/dto/pagination.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('var')
export class VarController {
  constructor(private readonly varService: VarService) { }

  @ApiTags('vars_var')
  @Get('obtener-vars-var')
  findPaginada(
    @Query('lang') lang: string,
    @Query() paginationDto: PaginationDto,
    @GetUser('id') userId: number
  ) {
    return this.varService.findPaginada(
      lang,
      paginationDto
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-var-var')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.varService.findOne(
      lang,
      +_id
    );
  }

  // contadores
  @Get('obtener-contadores-var')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.varService.contadorVariables(lang);
  }
}
