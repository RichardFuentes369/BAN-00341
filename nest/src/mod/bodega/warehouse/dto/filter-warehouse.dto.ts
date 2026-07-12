import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
    asc = 'asc',
    desc = 'desc'
  }

export class FilterWarehouseDto {

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
    id_medida?: string;  

    @IsOptional()
    @IsString()
    marca?: string;  

    @IsOptional()
    @IsString()
    producto?: string;  

    @IsOptional()
    @IsString()
    fecha_entrada_minimo?: string;   

    @IsOptional()
    @IsString()
    fecha_entrada_maximo?: string;   

    @IsOptional()
    @IsString()
    fecha_vencimiento_minimo?: string;   

    @IsOptional()
    @IsString()
    fecha_vencimiento_maximo?: string;   

    @IsOptional()
    @IsString()
    estado?: string;     
    
    @IsOptional()
    @IsString()
    cantidad_comprada_minimo?: string;     
    
    @IsOptional()
    @IsString()
    cantidad_comprada_maximo?: string;   
    
    @IsOptional()
    @IsString()
    cantidad_vendida_minimo?: string;    
    
    @IsOptional()
    @IsString()
    cantidad_vendida_maximo?: string;  

    @IsOptional()
    @IsString()
    cantidad_en_bodega_minimo ?: string;   

    @IsOptional()
    @IsString()
    cantidad_en_bodega_maximo ?: string; 

    @IsOptional()
    @IsString()
    id_marca?: string; 

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