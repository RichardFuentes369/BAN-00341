import { PartialType } from '@nestjs/swagger';
import { CreateExtentDto } from './create-extent.dto';
import { IsString } from 'class-validator';

export class UpdateExtentDto extends PartialType(CreateExtentDto) {
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly nombre;
}
