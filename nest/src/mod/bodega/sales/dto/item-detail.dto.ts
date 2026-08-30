import { IsString, IsNotEmpty } from "class-validator";

export class ItemPedidoDto {
  @IsString()
  @IsNotEmpty()
  lote: string;

  @IsString()
  @IsNotEmpty()
  codigo_barra: string;

  @IsString() // O @IsNumber() si decides manejarlo como número
  @IsNotEmpty()
  cantidad: string;
}