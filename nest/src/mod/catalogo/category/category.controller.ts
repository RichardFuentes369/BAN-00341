import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Categoria } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@guard/admin/admin.guard'; 
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterCategoryrDto } from '@module/catalogo/category/dto/filter-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('obtener-categorias')
  findAll(
    @Query('lang') lang: string,
    @Query() FilterCategoryrDto: FilterCategoryrDto,
    @GetUser('id') userId: number
  ) {
    return this.categoryService.findAll(
      FilterCategoryrDto, 
      lang
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-categoria')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.categoryService.findOne(
      lang, 
      +_id
    );
  }

  @UseGuards(AdminGuard)
  @Post('crear-categoria')
  create(
    @Query('lang') lang: string,
    @Body() categoryData: CreateCategoryDto,
    @GetUser('id') userId: number
  ) {
    return this.categoryService.create(
      lang, 
      categoryData, 
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Patch('editar-categoria')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() categoryData: UpdateCategoryDto,
    @GetUser('id') userId: number
  ) {
    return this.categoryService.update(
      lang, 
      +_id, 
      categoryData, 
      userId
    );
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-categoria')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.categoryService.remove(
      lang, 
      idsNumeros, 
      userId
    );
  }

  // contadores
  @Get('obtener-contadores-categorias')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.categoryService.contadoresCategorias(lang);
  }
}