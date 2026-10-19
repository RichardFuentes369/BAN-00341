import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

export class FilterWarehouseProductDTO {
    @IsString()
    lote?: string;

    @IsNumber()
    id_producto?: number;

    @IsOptional()
    @IsString()
    fecha_filtro_inicio?: string;

    @IsOptional()
    @IsString()
    fecha_filtro_fin?: string;

    @IsString()
    @IsOptional()
    lang?: string;
}