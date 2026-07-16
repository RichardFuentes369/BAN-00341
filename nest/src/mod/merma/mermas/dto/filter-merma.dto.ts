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
    year?: string;

    @IsOptional()
    @IsString()
    month?: string;

    @IsOptional()
    @IsString()
    lote?: string;  

    @IsOptional()
    @IsString()
    codigo_barra?: string;  

    @IsOptional()
    @IsString()
    cantidad_afectada_minimo?: string;   

    @IsOptional()
    @IsString()
    cantidad_afectada_maximo?: string;   

    @IsOptional()
    @IsString()
    fecha_reporte_minimo?: string;       
    
    @IsOptional()
    @IsString()
    fecha_reporte_maximo?: string;   

    @IsOptional()
    @IsString()
    valor_perdido_minimo?: string;   

    @IsOptional()
    @IsString()
    valor_perdido_maximo?: string;   

    @IsOptional()
    @IsString()
    observaciones?: string;   

    @IsOptional()
    @IsNumber()
    id_tipo_merma?: number;        

    @IsOptional()
    @IsNumber()
    id_lote?: number;     

    @IsOptional()
    @IsString()
    lang?: string;  
    
}