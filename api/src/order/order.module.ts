import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from 'src/schemas/order.model';
import { Cart } from 'src/schemas/cart.model';
import { User } from 'src/schemas/user.model';
import { Product } from 'src/schemas/product.model';

@Module({
  imports:[
    MongooseModule.forFeature([Order, Cart, User, Product])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
