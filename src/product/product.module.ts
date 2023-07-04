import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    HttpModule,
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]) 
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
