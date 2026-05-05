// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsOptional } from "class-validator";

export class CreateWarehouseDto {
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly fecha_entrada;

  @IsNumber()
  @IsOptional()
  // @Transform(({value}) => value.trim())
  readonly fecha_vencimiento;  
  
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly estado;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly id_producto;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly id_proveedor;  
  
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly lote;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly cantidad_comprada;    
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly cantidad_en_bodega;  
  
  @IsNumber()
  @IsOptional()
  // @Transform(({value}) => value.trim())
  readonly cantidad_vendida;
}
