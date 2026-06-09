import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Proveedor } from './entities/supplier.entity';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@guard/admin/admin.guard';
import { GetUser } from 'src/decorator/getIdUser.decorator';
import { FilterCategoryrDto } from '@module/catalogo/supplier/dto/filter-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get('obtener-proveedores')
  findAll(
    @Query('lang') lang: string,
    @Query() filterDto: FilterCategoryrDto,
    @GetUser('id') userId: number
  ) {
    return this.supplierService.findAll(filterDto, lang);
  }

  @UseGuards(AdminGuard)
  @Get('obtener-proveedor')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.supplierService.findOne(lang, +_id);
  }  
  
  @UseGuards(AdminGuard)
  @Get('obtener-proveedor-por-nit')
  finOneForNit(
    @Query('_nit') _nit: string,
    @Query('lang') lang: string,
    @GetUser('id') userId: number
  ) {
    return this.supplierService.findOneForNit(lang, _nit);
  }

  @UseGuards(AdminGuard)
  @Post('crear-proveedor')
  create(
    @Query('lang') lang: string,
    @Body() supplierData: CreateSupplierDto,
    @GetUser('id') userId: number
  ) {
    return this.supplierService.create(lang, supplierData, userId);
  }

  @UseGuards(AdminGuard)
  @Patch('editar-proveedor')
  update(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @Body() supplierData: UpdateSupplierDto,
    @GetUser('id') userId: number
  ) {
    return this.supplierService.update(lang, +_id, supplierData, userId);
  }

  @UseGuards(AdminGuard)
  @Delete('eliminar-proveedor')
  remove(
    @Query('lang') lang: string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.supplierService.remove(lang, idsNumeros, userId);
  }

  // contadores
  @Get('obtener-contadores-proveedores')
  async contadores(
    @Query('lang') lang:string,
  ) {
    return this.supplierService.contadoresProveedores(lang);
  }
  
}