import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, Header, StreamableFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterProductrDto } from './dto/filter-product.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream } from 'fs';

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
  @Get('obtener-producto-por-barcode')
  findOneBarCode(
    @Query('_barcode') _barcode: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.productService.findOneBarcode(lang, _barcode);
  }

  @UseGuards(AdminGuard)
  @Post('crear-producto')
  create(
    @Query('lang') lang: string,
    @Body() productData: CreateProductDto,
    @GetUser('id') userId: number
  ) {
    return this.productService.create(lang, productData, userId);
  }

  @UseGuards(AdminGuard)
  @Patch('editar-producto')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() productData: UpdateProductDto,
    @GetUser('id') userId: number
  ) {
    return this.productService.update(lang, +_id, productData, userId);
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

  @Get('plantilla-productos')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="plantilla_productos.xlsx"')
  async getStaticFile(): Promise<StreamableFile> {
    const filePath = join(process.cwd(), 'src', 'mod', 'catalogo', 'product', 'files', 'productos_nuevos.xlsx')
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  @UseGuards(AdminGuard)
  @Post('cargar-productos')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(
    @UploadedFile() file: Express.Multer.File,
    @Query('id_category') id_category: number
  ) {
    return this.productService.processExcel(file.buffer as any, id_category);
  }

  // contadores
  @Get('obtener-contadores-productos')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.productService.contadoresProductos(lang);
  }
}
