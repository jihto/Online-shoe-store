import { HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IAuth } from 'src/schemas/auth.model';
import { IUser } from 'src/schemas/user.model';
import { DataUserDto } from './dtos/user.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        @InjectModel('Auth') private readonly authModel:Model<IAuth>,
        @InjectModel('User') private readonly userModel:Model<IUser>,
    ) {}

    async signIn(email: string, password: string): Promise<DataUserDto>{
        const dataUser = new DataUserDto();
        try {
            const account = await this.authModel.findOne({ email });
            if(!account)
                throw new HttpException("User not register", HttpStatus.BAD_REQUEST);
            const isMatch = await bcrypt.compare(password, account?.password); 
            if(!isMatch)
                throw new UnauthorizedException();
            if(isMatch){
                const user: IUser = await this.userModel.findOne({ account: account._id});
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: account.email,
                    account: user.account,
                }
                const generateToke: string = await this.jwtService.signAsync(payload,{
                    secret: "pnjihto123",
                    expiresIn: "1h"
                });
                await account.updateOne({ token: generateToke }); 
                dataUser._id =user._id;
                dataUser.email = account.email;
                dataUser.name = user.name;
                dataUser.address =  user.address;
                dataUser.token = generateToke;
                dataUser.favoriteProduct = user.favoriteProduct.map((str) => new mongoose.Types.ObjectId(str))
                dataUser.cart = user.cart; 
            }
            console.log(dataUser);
            return dataUser;
        } catch (error: any) {
            throw new NotAcceptableException(error.message)
        }
    }


    async signUp(name: string, email: string, password: string):Promise<HttpException>{
        try {
            const isUser = await this.authModel.findOne({ email });
            if(isUser)
                throw new HttpException('User is exist', HttpStatus.BAD_REQUEST); 
            const hashPassword = await bcrypt.hash(password, 10); 
            if(!hashPassword)
                throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            const newAuth = new this.authModel({
                email,
                password: hashPassword,
            }); 
            const newUser = new this.userModel({
                name,
                account: newAuth._id
            });
            await newAuth.save();  
            await newUser.save();  
            return new HttpException('Create user successful', HttpStatus.OK); 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
}
