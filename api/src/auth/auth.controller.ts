import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';  
import { SignInDto, SignUpDto } from './dtos/Verify.dto';
import { DataUserDto } from './dtos/user.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(
        @Body() signInDto: SignInDto
    ): Promise<DataUserDto>{
        console.log({ signInDto })
        return this.authService.signIn(signInDto.email, signInDto.password);
    }


    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(
        @Body() signUp: SignUpDto
    ): Promise<HttpException>{ 
        return this.authService.signUp(signUp.name, signUp.email, signUp.password);
    }
}
