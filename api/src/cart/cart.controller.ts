import { Body,Get, Controller, HttpException, Param, Post, Request } from '@nestjs/common';
import { CartService } from './cart.service'; 
import mongoose from 'mongoose';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
    ){} 

    @Get('/:id')
    async getCart( 
        @Param('id') cartId: string,
    ) {
        return this.cartService.getProductsInCart(cartId);
    }


    @Post('addItem/:id')
    addToCart(
        @Param('id') productId: string, 
        @Request() req: any,
    ){  
        return this.cartService.addItemToCart(productId, req.user); 
    }
    @Post('removeItem/:id')
    removeFromCart(
        @Param('id') productId: string, 
        @Request() req: any, 
    ): Promise<HttpException>  {   
        return this.cartService.removeItemFromCart(productId, req.user); 
    }
}
