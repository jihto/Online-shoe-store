import { Exclude, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { IUser } from "src/schemas/user.model";
import { PickType } from "@nestjs/mapped-types/dist";
import { ISeller } from "src/schemas/seller.model";

export class ProductDto{
    @IsNotEmpty()
    @Type(() => String)
    _id: String;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNumber()
    @IsOptional() 
    price: number;

    @IsNotEmpty()
    @IsString()
    picture: string;

    @IsString()
    pictureHash: string;
 
    @IsBoolean()
    categogies: string[];

    @IsString() // convert ObjectId to string 
    seller: ISeller["_id"];  

    @Exclude()
    @IsBoolean()
    isDeleted: boolean;

    @IsOptional()
    @IsString()
    createdAt: Date;
    
    
    @IsOptional()
    buyer: IUser['_id'][];

    @IsOptional()
    @IsDate()
    updatedAt: Date;

    @Exclude()
    __v: number;

    constructor(partial: Partial<ProductDto>){ 
        Object.assign(this, partial);
    }
}

export class CreateProductDto extends PickType(
    ProductDto,
    ['name', 'price', 'seller', 'description', 'categogies'] as const
){
    [Symbol.iterator]() {
        let index = 0;
        const properties = Object.keys(this);
        return {
            next: () => {
                if (index < properties.length) {
                    const propertyName = properties[index];
                    const propertyValue = this[propertyName];
                    index++;
                    return { 
                        value: { 
                            [propertyName]: propertyValue 
                        },
                        done: false
                    };
                } else {
                    return { done: true };
                }
            },
        };
    }
}


export class UpdateProductDto extends PickType(
    ProductDto,
    ['name', 'description', 'price','updatedAt'] as const
){ }
