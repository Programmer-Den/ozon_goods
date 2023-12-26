import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [                // Config... для доступа к .env файлу
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    ProductModule        // ↑ mongodb://localhost/<db_name>
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
