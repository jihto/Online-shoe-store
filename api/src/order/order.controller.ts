import { Body, Controller,Request, Param, Post, Put, HttpException, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from './Order.interface';

@Controller('order')
export class OrderController {
    
    constructor(
        private readonly orderService: OrderService,
    ){}
    
    @Get()
    getHistoryOrder(
        @Request() request: any, 
    ){
        return this.orderService.getHistoryOrder(request.user);
    }

    @Post('/:id')
    createOrderOfUser(  
        @Param('id') cartId: string,
        @Body() { payment } : CreateOrderDto,
        @Request() request: any,
    ): Promise<OrderDto>{
        return this.orderService.createOrder(cartId,request.user, payment);
    }

    @Put('/:id')
    updateOrderOfUser(
        @Param('id') cartId: string,
        @Body() { isDelivered, payment } : UpdateOrderDto,
    ):  Promise<HttpException>{
        return this.orderService.updateOrder(cartId, isDelivered, payment)
    }

    @Get('current')
    getCurrentOrder(
        @Request() request: any, 
    ){
        return this.orderService.getCurrentOrder(request.user);
    }
}
