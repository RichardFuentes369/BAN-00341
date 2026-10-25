import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class ItemPedidoDto {
  @IsString()
  @IsNotEmpty()
  lote: string;

  @IsString()
  @IsNotEmpty()
  codigo_barra: string;

  @IsNumber() // O @IsNumber() si decides manejarlo como número
  @IsNotEmpty()
  cantidad: number;

  @IsNumber() // O @IsNumber() si decides manejarlo como número
  @IsNotEmpty()
  valor_unitario: number;

  @IsNumber() // O @IsNumber() si decides manejarlo como número
  @IsNotEmpty()
  valor_total: number;
}