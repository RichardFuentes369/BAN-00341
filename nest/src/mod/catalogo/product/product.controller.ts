import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterProductrDto } from './dto/filter-product.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('obtener-productos')
  findAll(
    @Query('lang') lang: string,
    @Query() filterDto: FilterProductrDto,
    @GetUser('id') userId: number
  ) {
    return this.productService.findAll(filterDto, lang);
  }

  @UseGuards(AdminGuard)
  @Get('obtener-producto')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.productService.findOne(lang, +_id);
  }

  @UseGuards(AdminGuard)
  @Post('crear-producto')
  create(
    @Query('lang') lang: string,
    @Body() supplierData: CreateProductDto,
    @GetUser('id') userId: number
  ) {
    return this.productService.create(lang, supplierData, userId);
  }

  @UseGuards(AdminGuard)
  @Patch('editar-producto')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() supplierData: UpdateProductDto,
    @GetUser('id') userId: number
  ) {
    return this.productService.update(lang, +_id, supplierData, userId);
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-producto')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.productService.remove(lang, idsNumeros, userId);
  }
}
