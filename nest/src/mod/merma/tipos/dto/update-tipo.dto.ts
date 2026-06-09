import { PartialType } from '@nestjs/swagger';
import { CreateTipoDto } from './create-tipo.dto';
import { IsString } from 'class-validator';

export class UpdateTipoDto extends PartialType(CreateTipoDto) {
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;
}
