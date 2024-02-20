import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class ProductResponseDto {
    @IsNotEmpty()
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNumber()
    @IsOptional() 
    price: number;

    @IsString()
    picture: string;

    constructor(partial: Partial<ProductResponseDto>){ 
        Object.assign(this, partial);
    }
}