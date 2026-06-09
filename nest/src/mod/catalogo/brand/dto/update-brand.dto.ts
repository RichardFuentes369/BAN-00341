import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';
import { IsString } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly nombre;
}
