import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
    asc = 'asc',
    desc = 'desc'
  }

export class FilterBatchDto {

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
    fecha_entrada?: string;   

    @IsOptional()
    @IsString()
    fecha_vencimiento?: string;   

    @IsOptional()
    @IsString()
    costo_unitario?: string;   

    @IsOptional()
    @IsString()
    precio_venta_sugerido?: string;   

    @IsOptional()
    @IsString()
    estado?: string;     
    
    @IsOptional()
    @IsString()
    cantidad_comprada?: string;     
    
    @IsOptional()
    @IsString()
    cantidad_vendida?: string;     
    
    @IsOptional()
    @IsString()
    stock?: string; 

    @IsOptional()
    @IsString()
    id_producto?: string; 

    @IsOptional()
    @IsString()
    id_proveedor?: string; 

    @IsOptional()
    @IsString()
    lote?: string; 

    @IsOptional()
    @IsString()
    lang?: string;  
    
}