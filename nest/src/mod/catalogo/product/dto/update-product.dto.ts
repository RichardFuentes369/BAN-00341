import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";
import { Exclude, Transform } from 'class-transformer';

export class  UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @Exclude() 
  marca?: any;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  @IsBoolean()
  es_perecedero?: boolean;

  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  alerta_amarilla: number | null;
  
  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  alerta_naranja: number | null;
  
  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly estado;

  @IsOptional()
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;
  
  @IsOptional()
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly codigo_barra;
  
  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly stock_minimo;  

  @IsOptional()
  @IsNumber()
  readonly id_medida;
}