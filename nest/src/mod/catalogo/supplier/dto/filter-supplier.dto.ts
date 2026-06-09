import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
  asc = 'asc',
  desc = 'desc'
}

export class FilterCategoryrDto {
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
  @IsString()
  nit?: string;   

  @IsOptional()
  @IsString()
  razon_social?: string;   

  @IsOptional()
  @IsString()
  direccion?: string;   

  @IsOptional()
  @IsString()
  telefono?: string;   

  @IsOptional()
  @IsString()
  correo?: string;   

  @IsOptional()
  @IsNumber()
  isActive?: number;

  @IsOptional()
  @IsString()
  lang?: string;  
}