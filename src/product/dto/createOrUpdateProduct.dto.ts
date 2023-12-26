import { Types } from "mongoose";
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsMongoId } from "class-validator"

export class CreateOrUpdateProductDto {
  @IsString() @IsNotEmpty() name: string;
  @IsNumber() @IsNotEmpty() price: number;

  @IsNumber() @IsOptional() vat: number; // НДС
  @IsNumber() @IsOptional() weight: number;
  
  @IsMongoId() @IsOptional() id: Types.ObjectId
}
