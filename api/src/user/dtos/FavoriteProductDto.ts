import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FavoriteProductDto {
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

    @IsString()
    picture: string;

    constructor(partial: Partial<FavoriteProductDto>){ 
        Object.assign(this, partial);
    }
}