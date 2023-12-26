import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: Product.name,
      imports: [ConfigModule],
      useFactory: () => {
        ProductSchema.pre('save', function() {
          this.updateDate = new Date();
        });
        return ProductSchema;
      }}]
    )
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
