// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly descripcion;
}
