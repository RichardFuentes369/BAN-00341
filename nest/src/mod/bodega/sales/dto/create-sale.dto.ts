// import { Transform } from "class-transformer";
import { Type } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsOptional, IsArray, ArrayMinSize, ValidateNested } from "class-validator";
import { ItemPedidoDto } from "./item-detail.dto";

export class CreateSaleDto {
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nro_factura;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly fecha_venta;

  @IsArray()
  @ArrayMinSize(1) 
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto) 
  detalle_factura: ItemPedidoDto[];
}
