import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { VarService } from './var.service';
import { CreateVarDto } from './dto/create-var.dto';
import { UpdateVarDto } from './dto/update-var.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { PaginationDto } from '@global/dto/pagination.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { FilterVarDto } from './dto/filter-var.dto';

@Controller('var')
export class VarController {
  constructor(private readonly varService: VarService) { }

  @ApiTags('vars_var')
  @Get('obtener-vars-var')
  findPaginada(
    @Query('lang') lang: string,
    @Query() filterVarDto: FilterVarDto,
    @GetUser('id') userId: number
  ) {
    return this.varService.findPaginada(
      lang,
      filterVarDto
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

  @UseGuards(AdminGuard)
  @Post('crear-var-var')
  create(
    @Query('lang') lang: string,
    @Body() createVar: CreateVarDto,
    @GetUser('id') userId: number
  ) {
    return this.varService.create(
      lang,
      createVar,
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Patch('editar-var-var')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() updateVarDto: UpdateVarDto,
    @GetUser('id') userId: number
  ) {
    return this.varService.update(
      lang,
      +_id,
      updateVarDto,
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-var-var')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.varService.remove(
      lang,
      idsNumeros,
      userId
    );
  }

  // contadores
  @Get('obtener-contadores-var')
  async contadores(
    @Query('lang') lang: string,
  ) {
    return this.varService.contadorVariables(lang);
  }

  @Get('getVar')
  async getVar(
    @Query('name') name: string
  ) {
    return this.varService.getVar(name);
  }
}
