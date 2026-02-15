import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@guard/admin/admin.guard'; // Ajusta la ruta según tu proyecto
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterCategoryrDto } from '@module/catalogo/category/dto/filter-category.dto'; // Reutilizando tu DTO de filtrado

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiTags('category')
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

  @ApiTags('category')
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

  @ApiTags('category')
  @UseGuards(AdminGuard)
  @Post('crear-categoria')
  create(
    @Query('lang') lang: string,
    @Body() categoryData: Partial<Category>,
    @GetUser('id') userId: number
  ) {
    return this.categoryService.create(
      lang, 
      categoryData, 
      userId
    );
  }

  @ApiTags('category')
  @UseGuards(AdminGuard)
  @Patch('editar-categoria')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() categoryData: Partial<Category>,
    @GetUser('id') userId: number
  ) {
    return this.categoryService.update(
      lang, 
      +_id, 
      categoryData, 
      userId
    );
  }

  @ApiTags('category')
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
}