import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

export class FilterWarehouseProductDTO {
    @IsString()
    lote?: string;

    @IsNumber()
    id_producto?: number;

    @IsString()
    @IsOptional()
    lang?: string;
}