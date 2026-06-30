// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsNotEmpty, IsJSON, IsObject } from "class-validator";

export class CreateJsonDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  readonly valor: any;
}
