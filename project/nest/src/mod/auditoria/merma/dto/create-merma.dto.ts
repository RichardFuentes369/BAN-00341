import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { AccionAuditoria } from '../../enums/enumAuditoria'; 

export class CreateAuditoriaMermaDto {
  @IsInt({ message: 'El id_afectado debe ser un número entero' })
  @IsNotEmpty({ message: 'El id_afectado es obligatorio' })
  id_afectado: number;

  @IsEnum(AccionAuditoria, { message: 'La acción debe ser un valor válido del enum AccionAuditoria' })
  @IsNotEmpty({ message: 'La acción es obligatoria' })
  accion: AccionAuditoria;

  @IsInt({ message: 'El id_usuario debe ser un número entero' })
  @IsNotEmpty({ message: 'El id_usuario es obligatorio' })
  id_usuario: number;

  @IsObject({ message: 'Los detalles deben ser un objeto JSON válido' })
  @IsOptional()
  detalles?: Record<string, any>;
}