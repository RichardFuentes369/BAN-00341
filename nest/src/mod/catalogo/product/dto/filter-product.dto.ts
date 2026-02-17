import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
  asc = 'asc',
  desc = 'desc'
}

export class FilterProductrDto {
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
  field?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Order)
  order?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  id_category?: number;   

  @IsOptional()
  @IsString()
  codigo_barra?: string;   

  @IsOptional()
  @IsString()
  nombre?: string;    
  
  @IsOptional()
  @IsString()
  stock_minimo?: string;    
  
  @IsOptional()
  @IsString()
  unidad_medida?: string;   

  @IsOptional()
  @IsNumber()
  isActive?: number;

  @IsOptional()
  @IsString()
  lang?: string;  
}