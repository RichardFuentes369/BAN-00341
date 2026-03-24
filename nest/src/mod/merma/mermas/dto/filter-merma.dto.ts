import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
    asc = 'asc',
    desc = 'desc'
  }

export class FilterRegistroMermaDto {

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
    cantidad?: string;   

    @IsOptional()
    @IsString()
    fecha_reporte?: string;   

    @IsOptional()
    @IsString()
    valor_perdido?: string;   

    @IsOptional()
    @IsString()
    observaciones?: string;   

    @IsOptional()
    @IsString()
    id_tipo_merma?: string;     
    
    @IsOptional()
    @IsString()
    id_lote?: string;     

    @IsOptional()
    @IsString()
    lang?: string;  
    
}