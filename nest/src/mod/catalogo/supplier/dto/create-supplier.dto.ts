// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateSupplierDto {
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly nit;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly razon_social;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly direccion;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly correo;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly telefono;
}
