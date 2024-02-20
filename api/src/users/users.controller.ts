import { Body, Controller, Get, Header,Request, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post('dalle')
    @Header('Access-Control-Allow-Origin', 'http://localhost:5173')
    generateImage(@Body('prompt') prompt: string){ 
        return this.usersService.createImage(prompt);
    }


    @Get()
    getInforUser(
        @Request() request: any,
    ){
        console.log(request.user);
        return this.usersService.getUser();
    }
}

