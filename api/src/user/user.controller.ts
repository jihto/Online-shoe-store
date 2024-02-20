import { Body, Param, Put, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service'; 
import { DataUpdateUserDto, DataUserResponseDto } from './dtos/DataUserResponse.dto';
import { HttpException } from '@nestjs/common/exceptions';
@Controller('user')
export class UserController {

    constructor(
        private readonly userService:UserService,
    ){}

    @Get()
    getInforUser(
        @Request() request: any,
    ): Promise<DataUserResponseDto>{ 
        return this.userService.getUser(request.user);
    }

    @Post()
    updateInformationUser(
        @Body() { name, sex, address }: DataUpdateUserDto ,
        @Request() request: any,
    ){
        return this.userService.updateInformation(name, sex, address, request.user);
    }

    
    @Put('favorite/product/:id')
    favoriteProduct( 
        @Param('id') productId: string,
        @Request() request: any,
    ): Promise<HttpException>{
        return this.userService.favoriteProduct(productId, request.user);
    }

    @Put('unfavorite/product/:id')
    unFavoriteProduct( 
        @Param('id') productId: string,
        @Request() request: any,
    ): Promise<HttpException>{
        return this.userService.unFavoriteProduct(productId, request.user);
    }

    @Get('favorite/product')
    getFavoriteProduct(
        @Request() request: any,
    ){
        return this.userService.getFavoriteProduct(request.user);
    }
}
