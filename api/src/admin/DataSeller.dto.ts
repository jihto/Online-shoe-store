import { Exclude, Type } from "class-transformer";
import { IsArray, IsEmail,IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose, { Types } from "mongoose";
import { IAuth } from "src/schemas/auth.model";
import { IProduct } from "src/schemas/product.model";

export class DataSellerDto{
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId; 

    @IsString()
    address: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @Exclude()
    @Type(() => String)
    account:  IAuth['_id']; 

    @Type(() => String)
    products: IProduct['_id'][]

 
    constructor(partial: Partial<DataSellerDto>){ 
        Object.assign(this, partial);
    }
}
