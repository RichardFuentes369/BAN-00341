import { PartialType } from '@nestjs/swagger';
import { CreateJsonDto } from './create-json.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateJsonDto extends PartialType(CreateJsonDto) {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  readonly valor: any;
}
