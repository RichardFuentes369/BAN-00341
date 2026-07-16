import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
    asc = 'asc',
    desc = 'desc'
  }

export class FilterVarDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @IsString()
    field: string;

    @IsOptional()
    @IsString()
    @IsEnum(Order)
    order?: string;
    
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    lang?: string;  
    
}