import { Controller, Post, Body, Request, UseGuards, Delete, NotFoundException, Param } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CartService } from './cart.service';
import { ItemDTO } from '../user/dtos/item.dto';
import { request } from 'http';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    @Post('/')
    @ApiCreatedResponse({ description: 'Cria carrinho de compras' })
    @ApiUnauthorizedResponse({ description: 'Rota autorizada, necessário autenticação' })
    async addItemToCart(@Request() req, @Body() itemDTO: ItemDTO) {
        const hawHeaders = req.rawHeaders;
        const cart = await this.cartService.addItemToCart(hawHeaders, itemDTO);
        return cart;
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    @Delete('/')
    @ApiCreatedResponse({ description: 'remove carrinho de compras' })
    @ApiUnauthorizedResponse({ description: 'Rota autorizada, necessário autenticação' })
    @ApiNotFoundResponse({description: 'Carrinho não encontrado'})
    async removeItemFromCart(@Request() req, @Body() { productId }) {
        const cart = await this.cartService.removeItemFromCart(req.rawHeaders, productId);
        if (!cart) throw new NotFoundException('Item does not exist');
        return cart;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    @Delete('/:id')
    @ApiCreatedResponse({ description: 'deleta carrinho de compras' })
    @ApiUnauthorizedResponse({ description: 'Rota autorizada, necessário autenticação' })
    @ApiNotFoundResponse({description: 'Carrinho não encontrado'})
    async deleteCart(@Request() req, @Param('id') userId: string) {
        const cart = await this.cartService.deleteCart(req.rawHeaders, userId);
        if (!cart) throw new NotFoundException('Cart does not exist');
        return cart;
    }
}
