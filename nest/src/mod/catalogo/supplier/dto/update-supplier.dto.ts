import { PartialType } from '@nestjs/swagger';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsNumber, IsString } from "class-validator";

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
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
