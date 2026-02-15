import { PartialType } from '@nestjs/swagger';
import { CreateMermaDto } from './create-merma.dto';

export class UpdateMermaDto extends PartialType(CreateMermaDto) {}
