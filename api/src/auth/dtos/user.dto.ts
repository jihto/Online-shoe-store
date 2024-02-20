import { Exclude, Type } from "class-transformer";
import { IsArray, IsEmail,IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose, { Types } from "mongoose";

export class DataUserDto{
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
 
    @Type(() => String)
    cart: mongoose.Schema.Types.ObjectId;
    
    @Exclude()
    @Type(() => String)
    account: Types.ObjectId;  

    @IsArray()
    @Type(() => String)
    favoriteProduct: Types.ObjectId[]
}
