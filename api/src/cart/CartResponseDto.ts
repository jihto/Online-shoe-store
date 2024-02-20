import { OmitType, PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsNumber, IsObject, IsString } from "class-validator";
import mongoose from "mongoose";
import { ProductResponseDto } from "src/common/dtos/ProductResponseDto"; 

export class CartResponseDto {
    @Type(()=>String)
    _id: mongoose.Schema.Types.ObjectId;


    @Type(()=>String)
    products: CartProductDto[]; 


    @IsString()
    updatedAt: string;

    @IsNumber()
    totalPrice: number;
    
    constructor(partial: Partial<CartResponseDto>){ 
        Object.assign(this, partial);
    }
}

// 
class CartProductDto  {  
    @Type(()=>String)
    _id: mongoose.Schema.Types.ObjectId;


    @IsNumber()
    quantity: number;

    @Type(()=>String)
    product: ProductResponseDto; 
}
