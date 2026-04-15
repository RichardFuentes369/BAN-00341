import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { UnidadMedida } from "../enums/UnidadMedida";

export class CreateProductDto {

  @IsBoolean()
  // @Transform(({value}) => value.trim())
  readonly es_perecedero;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly alerta_amarilla;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly alerta_naranja;  
  
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly estado;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;
  
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly codigo_barra;

  @IsNumber()
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
