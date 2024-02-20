import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRequestDto } from 'src/common/dtos/UserRequestDto';
import { Payment } from 'src/common/types/Payment.enum';
import { ICart } from 'src/schemas/cart.model';
import { IOrder } from 'src/schemas/order.model';
import { OrderDto } from './Order.interface';
import { convertArrayToPlainObjects, convertToPlainObject } from 'src/common/utils/convertMongooseToObject';
import { IUser } from 'src/schemas/user.model';
import { IProduct } from 'src/schemas/product.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly OrderModel:Model<IOrder>,
        @InjectModel('Product') private readonly ProductModel:Model<IProduct>,
        @InjectModel('Cart') private readonly CartModel:Model<ICart>,
        @InjectModel('User') private readonly UserModel:Model<IUser>,
    ){}

    getHistoryOrder = async (
        user: UserRequestDto 
    ):Promise<OrderDto[]> =>{
        try {
            const orders = await this.OrderModel.find({ buyer: user._id });
            const result = await convertArrayToPlainObjects(orders); 
            return result.map((item: any) => new OrderDto(item));       
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    getCurrentOrder = async( user: UserRequestDto ) => {
        try {
            const order = await this.OrderModel.findOne({ buyer: user._id, isDelivered: false });
            const productsOtder = await this.CartModel.findById( order.cart)
                .populate({
                    path: 'products.product',
                    select: 'name description price picture', // Select the fields you want to retrieve from the 'Product' model
                })
                .lean()
                .exec(); 
            console.log(productsOtder);
            // const result = await convertToPlainObject(productsOtder); 
            // return result.map((item: any) => new OrderDto(item));
            
            return productsOtder;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    createOrder = async(
        cartId: string,
        user: UserRequestDto, 
        payment: Payment,  
    ): Promise<OrderDto> => {
        try {
            const cart = await this.CartModel.findOne({_id: cartId}).lean();
            if(!cart)
                throw new HttpException("Not find cart", HttpStatus.BAD_REQUEST); 
            cart.products.forEach( async(item) => await this.ProductModel.updateOne({ _id: item.product }, { $push: { buyer: user._id }}) ); 
            const order = new this.OrderModel({
                cart: cartId,
                buyer: user._id,
                ...(payment && { payment }),
                pricePurchase:cart.totalPrice, 
            });
            await order.save();
            await this.UserModel.findOneAndUpdate({ _id:user._id }, { $set: { cart: null  }})

            // Retrieve the order as a plain JavaScript object
            const result = await convertToPlainObject(order);
            return new OrderDto({});
        } catch (error) {
            throw new NotAcceptableException();
        } 
    }

    updateOrder = async (
        cartId: string, 
        isDelivered: boolean,
        payment: Payment
    ): Promise<HttpException> =>{
        try {
            const updateOrder = await this.OrderModel.findOneAndUpdate({_id: cartId}, { $set: { ...(isDelivered && { isDelivered }),  ...(payment && { payment }),} })
            if(!updateOrder)
                throw new HttpException("Some thing wrong in process update service", HttpStatus.BAD_GATEWAY);
            return new HttpException("Update status order successfull", HttpStatus.OK);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }
}
