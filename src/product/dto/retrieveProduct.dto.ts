import { Types } from "mongoose";
import { IsMongoId } from "class-validator"

export class RetrieveProductDto {
  @IsMongoId() id: Types.ObjectId
}
