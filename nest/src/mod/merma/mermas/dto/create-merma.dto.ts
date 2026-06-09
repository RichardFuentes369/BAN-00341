import { IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateMermaDto {
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly cantidad;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly fecha_reporte;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly valor_perdido;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly observacion;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly id_tipo_merma;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly id_lote;
}
