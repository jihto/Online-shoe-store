import { IsEmail,IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class SignInDto{
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ValidateIf((o) => o.password.length < 8)
    @IsString()
    password: string;
}

export class SignUpDto extends SignInDto{
    @IsNotEmpty()
    name: string;
}