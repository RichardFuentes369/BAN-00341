import { IsEnum, IsNumber, IsString } from "class-validator";
import { UnidadMedida } from "../enums/UnidadMedida";

export class CreateProductDto {
  
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly codigo_barra;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly marca;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly stock_minimo;  
  
  @IsNumber()
  readonly id_categoria;

  @IsEnum(UnidadMedida)
  readonly unidad_medida: UnidadMedida;
}
