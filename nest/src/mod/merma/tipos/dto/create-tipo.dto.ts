import { IsString } from "class-validator";

export class CreateTipoDto {
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;
}
