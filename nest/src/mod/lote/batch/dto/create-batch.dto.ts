// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsOptional } from "class-validator";

export class CreateBatchDto {
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly fecha_entrada;

  @IsNumber()
  @IsOptional()
  // @Transform(({value}) => value.trim())
  readonly fecha_vencimiento;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly costo_unitario;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly precio_venta_sugerido;
  
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
  readonly cantidad_vendida;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly stock;
}
