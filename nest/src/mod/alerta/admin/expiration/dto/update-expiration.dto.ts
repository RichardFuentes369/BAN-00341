import { PartialType } from '@nestjs/swagger';
import { CreateExpirationDto } from './create-expiration.dto';

export class UpdateExpirationDto extends PartialType(CreateExpirationDto) {}
