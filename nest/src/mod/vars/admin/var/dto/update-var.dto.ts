import { PartialType } from '@nestjs/swagger';
import { CreateVarDto } from './create-var.dto';
import { IsString } from 'class-validator';

export class UpdateVarDto extends PartialType(CreateVarDto) {
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly nombre;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly valor;
}
