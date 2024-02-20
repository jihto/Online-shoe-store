import {  Type } from "class-transformer";
import {   IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IUser } from "src/schemas/user.model"; 
import { IProduct } from "src/schemas/product.model";
import mongoose from "mongoose";

export class CommentDto{
    @IsNotEmpty()
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    content: string;  
    
    @IsString()
    picture: string;   

    @IsOptional() 
    user: IUser["_id"];  

    @Type(() => String)
    product: IProduct["_id"];  

    
    @IsOptional()
    @IsDate()
    timeStamp: Date; 

    constructor(partial: Partial<CommentDto>){ 
        Object.assign(this, partial);
    }
}
