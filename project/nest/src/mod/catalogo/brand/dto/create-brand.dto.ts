// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateBrandDto {
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;
}
