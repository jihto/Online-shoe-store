import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRequestDto{ 
    
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    account: string;

    @IsNumber()
    iat: number;

    @IsNumber()
    exp: number; 
}