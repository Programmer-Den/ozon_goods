import { Controller, Req, Body, Res, Post, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { CreateOrUpdateProductDto } from './dto/createOrUpdateProduct.dto';
import { RetrieveProductDto } from './dto/retrieveProduct.dto';

@Controller('v2')
export class ProductController {
  constructor (private productService: ProductService) {}

  @Post('/product/import')
  async createOrUpdateProduct(
    @Req() req: Request,
    @Body() body: CreateOrUpdateProductDto,
    @Res() res: Response
  ) {
    try {
      let product: { [key: string]: any };

      if (body.id) {
        product = await this.productService.updateProduct(body)
      } else {
        product = await this.productService.createProduct(body)
      }
      return res.status(HttpStatus.OK).json({ result: product })
    } catch(err) {
      return res.status(400).json({ message: err.message })
    }
  }
  
  @Post('/product/info')
  async retrieveProduct(
    @Req() req: Request,
    @Body() body: RetrieveProductDto,
    @Res() res: Response
  ) {    
    let message404 = `В БД отсутствует товар с id ${body.id}`;

    return this.productService.findProductById(body.id)
      .then(product => {
        if (product != null) return res.status(200).json(product);
         
        throw new Error(message404);// пробросим в довесок к catch
      })
      .catch(err => res.status(404).json({ message: message404 }))
  }

  @Post('/products/delete')
  async deleteProducts(
    @Req() req: Request,
    @Body() body,
    @Res() res: Response
  ) {
    try {
      var { status, statusCode } = await this.productService
        .deleteProducts(body.products);

      return res.status(statusCode).json({ status });
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}
