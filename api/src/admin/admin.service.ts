import { HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IAuth } from 'src/schemas/auth.model';
import { ISeller } from 'src/schemas/seller.model';

import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/types/Roles.enum';
import { DataSellerDto } from './DataSeller.dto';


@Injectable()
export class AdminService {

    constructor(
        private readonly jwtService: JwtService, 
        @InjectModel('Seller') private readonly SellerModel:Model<ISeller>,
        @InjectModel('Auth') private readonly AuthModel:Model<IAuth>,
    ) {}

    async signIn(email: string, password: string){ 
        try {
            const account = await this.AuthModel.findOne({ email });
            if(!account)
                throw new HttpException("Seller not register", HttpStatus.BAD_REQUEST);
            const isMatch = await bcrypt.compare(password, account?.password); 
            if(!isMatch)
                throw new UnauthorizedException();
            if(isMatch){
                const seller = await this.SellerModel.findOne({ account: account._id});
                const generateToke: string = await this.jwtService.signAsync({
                    _id: seller._id, 
                    name: seller.name,
                    email: account.email,
                    account: seller.account,
                },{
                    secret: "pnjihto123",
                    expiresIn: "1h"
                }); 
                const payload = new DataSellerDto({
                    _id: seller._id, 
                    name: seller.name,
                    email: account.email,
                    account: seller.account,
                    products: seller.products, 
                    token: generateToke
                })
                await account.updateOne({ token: generateToke }); 
                return payload; 
            } 
        } catch (error: any) {
            throw new NotAcceptableException(error.message)
        }
    }
    async signUp(name: string, email: string, password: string):Promise<HttpException>{
        try {
            const isSeller = await this.AuthModel.findOne({ email });
            if(isSeller)
                throw new HttpException('Seller is exist', HttpStatus.BAD_REQUEST); 
            const hashPassword = await bcrypt.hash(password, 10); 
            if(!hashPassword)
                throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            const newAuth = new this.AuthModel({
                email,
                role: Role.ADMIN,
                password: hashPassword,
            }); 
            const newSeller = new this.SellerModel({
                name,
                account: newAuth._id
            });
            await newAuth.save();  
            await newSeller.save();  
            return new HttpException('Create user successful', HttpStatus.OK); 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

}
