import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNumber, IsString, IsOptional } from "class-validator";
import { UnidadMedida } from '../enums/UnidadMedida'; 

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  readonly codigo_barra?: string;

  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsNumber()
  readonly stock_minimo?: number;  
  
  @IsOptional()
  @IsEnum(UnidadMedida)
  readonly unidad_medida: UnidadMedida;
}