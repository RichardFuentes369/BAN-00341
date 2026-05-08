// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsOptional } from "class-validator";

export class CreateWarehouseDto {
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly lote;  

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly fecha_entrada;

  @IsNumber()
  @IsOptional()
  // @Transform(({value}) => value.trim())
  readonly fecha_vencimiento;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly cantidad_comprada;   
    
  @IsNumber()
  @IsOptional()
  // @Transform(({value}) => value.trim())
  readonly cantidad_vendida;     
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly cantidad_en_bodega;  

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly estado;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly id_producto;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly id_proveedor;   
}
