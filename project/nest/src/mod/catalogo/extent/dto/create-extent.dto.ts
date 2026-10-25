// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateExtentDto {
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly nombre;
}
