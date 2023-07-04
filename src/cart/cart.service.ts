import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from '../user/dtos/item.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
    private httpService: HttpService) { }



  async deleteCart(rawHeaders, userId: string): Promise<Cart> {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'Authorization': `${rawHeaders[7]}`,
    };
    const service = process.env.SERVICE_CART + '/cart/' + userId;
    const response = await this.httpService.delete(service, { headers: headersRequest }).toPromise();
    if (response.data.affected === 0) {
      throw new NotFoundException(`Cart with ID ${userId} not found`);
    }
    return response.data;

  }


  async addItemToCart(rawHeaders, itemDTO: ItemDTO): Promise<Cart> {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'Authorization': `${rawHeaders[7]}`,
    };
    const service = process.env.SERVICE_CART + '/cart';
    const response = await this.httpService.post(service, itemDTO, { headers: headersRequest }).toPromise();
    return response.data;
  }

  async removeItemFromCart(rawHeaders, productId): Promise<any> {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'Authorization': `${rawHeaders[7]}`
    };
    const service = process.env.SERVICE_CART + '/cart/removed/' + productId;
    const response = await this.httpService.delete(service, { headers: headersRequest }).toPromise();

    if (!response.data) throw new NotFoundException('Item does not exist');

    return response.data;
  }
}
