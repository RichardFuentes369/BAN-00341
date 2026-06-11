import { PartialType } from '@nestjs/swagger';
import { CreateSotckDto } from './create-sotck.dto';

export class UpdateSotckDto extends PartialType(CreateSotckDto) {}
