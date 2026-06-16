import { PartialType } from '@nestjs/swagger';
import { CreateVarDto } from './create-var.dto';

export class UpdateVarDto extends PartialType(CreateVarDto) {}
