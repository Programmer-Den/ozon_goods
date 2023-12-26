import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ required: true }) name: string;  
  @Prop({ required: true }) price: number;

  @Prop({ default: 0.2 }) vat: number;
  @Prop() /* ↑ НДС 20% */ weight: number;

  @Prop({ default: () => new Date()}) uploadDate: Date;

  @Prop() updateDate: Date; // pre save hook in product.module.ts

  @Prop() id: Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)
