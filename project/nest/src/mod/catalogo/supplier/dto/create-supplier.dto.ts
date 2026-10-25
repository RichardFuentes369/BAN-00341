import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  MaxLength, 
  IsNumberString,
  Length
} from 'class-validator';

export class CreateSupplierDto {

  @IsString()
  @IsNotEmpty()
  @IsNumberString({}, { message: 'El NIT debe contener solo números' })
  @MinLength(8, { message: 'El NIT debe tener al menos 8 dígitos' })
  @MaxLength(10, { message: 'El NIT no puede exceder los 10 dígitos' })
  readonly nit: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1, { message: 'El DV debe ser exactamente de 1 dígito' })
  @IsNumberString()
  readonly dv: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'La razón social es demasiado corta' })
  @MaxLength(255, { message: 'La razón social no puede exceder los 255 caracteres' })
  readonly razon_social: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'La dirección es insuficiente' })
  @MaxLength(255, { message: 'La dirección no puede exceder los 255 caracteres' })
  readonly direccion: string;

  @IsEmail({}, { message: 'El formato del correo es inválido' })
  @IsNotEmpty()
  @MaxLength(150, { message: 'El correo no puede exceder los 150 caracteres' })
  readonly correo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 dígitos' })
  @MaxLength(50, { message: 'El teléfono no puede exceder los 50 caracteres' })
  readonly telefono: string;
}