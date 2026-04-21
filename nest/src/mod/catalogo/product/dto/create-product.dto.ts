import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { UnidadMedida } from "../enums/UnidadMedida";

export class CreateProductDto {

  @IsBoolean()
  // @Transform(({value}) => value.trim())
  readonly es_perecedero;

  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  alerta_amarilla: number | null;
  
  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  alerta_naranja: number | null;
  
  @IsBoolean()
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
  readonly id_marca;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly stock_minimo;  

  @IsEnum(UnidadMedida)
  readonly unidad_medida: UnidadMedida;
}
