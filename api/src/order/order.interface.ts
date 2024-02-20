import { Exclude, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PickType } from "@nestjs/mapped-types/dist"; 
import mongoose from "mongoose";
import { Payment } from "src/common/types/Payment.enum";
import { IUser } from "src/schemas/user.model";
import { ICart } from "src/schemas/cart.model";

export class OrderDto{
    @IsNotEmpty()
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId;

    @IsOptional() 
    @IsString()
    dateOfPurchase: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString() 
    payment: Payment;

    @IsNotEmpty()
    @Type(() => String)
    cart: ICart["_id"];

    @IsNotEmpty()
    @Type(() => String)
    buyer: IUser["_id"];  

    @IsBoolean()
    isDelivered: boolean;

    @Exclude()
    __v: number;

    constructor(partial: Partial<OrderDto>){ 
        Object.assign(this, partial);
    }
}
// ISeller["_id"];  
export class CreateOrderDto extends PickType(
    OrderDto,
    ['payment'] as const
){ }


export class UpdateOrderDto extends PickType(
    OrderDto,
    ['isDelivered', 'payment'] as const
){ }