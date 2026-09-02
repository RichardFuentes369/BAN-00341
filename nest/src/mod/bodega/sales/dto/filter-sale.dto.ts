import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
  asc = 'asc',
  desc = 'desc'
}

export class FilterSaleDto {

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsString()
  field: string;

  @IsOptional()
  @IsString()
  @IsEnum(Order)
  order?: string;

  @IsOptional()
  @IsString()
  nro_factura?: string;

  @IsOptional()
  @IsString()
  fecha_venta_minimo?: string;   

  @IsOptional()
  @IsString()
  fecha_venta_maximo?: string;   

  @IsOptional()
  @IsString()
  lang?: string;
}