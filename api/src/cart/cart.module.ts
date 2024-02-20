import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart } from 'src/schemas/cart.model';
import { User } from 'src/schemas/user.model';
import { Product } from 'src/schemas/product.model';

@Module({
  imports:[
    MongooseModule.forFeature([Cart, User, Product])
  ],
  providers: [CartService,],
  controllers: [CartController]
})
export class CartModule {}
