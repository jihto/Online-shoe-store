import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose, { Types } from "mongoose";
import { Sex } from "src/common/types/Sex.enum";
import { PickType } from "@nestjs/mapped-types/dist";
import { IProduct } from "src/schemas/product.model";

export class DataUserResponseDto {
    @IsNotEmpty()
    @Type(() => String)
    _id: mongoose.Schema.Types.ObjectId; 

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsString()
    sex: Sex;

    @IsOptional()
    @Type(() => String)
    cart: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    favoriteProduct: IProduct['_id'][]

    @IsNotEmpty()
    @Type(() => String)
    account: string;  

    constructor(partial: Partial<DataUserResponseDto>){ 
        Object.assign(this, partial);
    } 
}


export class DataUpdateUserDto extends PickType(
    DataUserResponseDto,
    ['name', 'sex', 'address'] as const
){
}