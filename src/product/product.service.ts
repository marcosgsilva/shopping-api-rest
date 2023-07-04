import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductService {
  constructor(
    private httpService: HttpService,
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>
  ) { }

  async getFilteredProducts(filterProductDTO: FilterProductDTO): Promise<Product[]> {
    const response = await this.httpService.get(process.env.SERVICE_PRODUCT + '/store/products', { params: filterProductDTO }).toPromise();
    return response.data;
  }

  async getAllProducts() {
    console.log('Teste')
    const response = await this.httpService.get(process.env.SERVICE_PRODUCT + '/store/products');
    return response;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await this.httpService.get(process.env.SERVICE_PRODUCT + '/store/products/' + id).toPromise();
    return response.data;
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const response = await this.httpService.post(process.env.SERVICE_PRODUCT + '/store/products', createProductDTO).toPromise();
    return response.data;
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    const response = await this.httpService.put(process.env.SERVICE_PRODUCT + '/store/products/'+id, createProductDTO).toPromise();
    return response.data;
  }

  async deleteProduct(id: string): Promise<any> {
    const response = await this.httpService.delete(process.env.SERVICE_PRODUCT + '/store/products/' + id).toPromise();
    return response.data;
  }
}