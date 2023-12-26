import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './product.schema';
import { CreateOrUpdateProductDto } from './dto/createOrUpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ) {}

  async createProduct(body: CreateOrUpdateProductDto) {
    return await new this.productModel(body).save()
  }

  async updateProduct(body: CreateOrUpdateProductDto) {
    const product = await this.findProductById(body.id);

    product.name   = body.name;
    product.weight = body.weight;
    product.price  = body.price;
    product.vat    = body.vat;

    return await product.save()
  }

  async findProductById(id: Types.ObjectId) {
    return await this.productModel.findById(id)
  }

  async deleteProducts(products: Array<Product>) {
    const status = [];

    for (let product of products) {      
      const foundOne = await this?.findProductById(product.id);
      const deleted1 = await foundOne?.deleteOne();

      if (deleted1?.acknowledged === true) { // точно удалено ли
        status.push({ id: product.id, isDeleted: true });
        
        continue // переходит к след. тов., НЕ выполняя код ниже
      }

      status.push({ id: product.id, isDeleted: false, error:
        'Пожалуйста, по форме введите id существ. в БД товара'
      });
      
      var statusCode = 400; // если хотя бы 1 не удалён — ошибка
    }

    return { status, statusCode: statusCode || 200 }
  }
}
