import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose'; 
import { UserRequestDto } from 'src/common/dtos/UserRequestDto';
import { IUser } from 'src/schemas/user.model'; 
import { DataUserResponseDto } from './dtos/DataUserResponse.dto';
import { Sex } from 'src/common/types/Sex.enum';
import { FavoriteProductDto } from './dtos/FavoriteProductDto';
interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    picture: string;
    // other properties...
  }
  
@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly UserModel:Model<IUser>, 
    ){}

    getUser = async (
        dataUser: UserRequestDto,
    ): Promise<DataUserResponseDto> => {
        try {
            const _id = new mongoose.Types.ObjectId(dataUser._id); // Convert to Types.ObjectId
            const informationUser = await this.UserModel.findOne({ _id }).lean().exec(); 
            const dto = new DataUserResponseDto(informationUser); 
            return dto; 
        } catch (error) {
            throw new NotAcceptableException();
        }
    } 

    updateInformation = async(
        name: string, 
        sex: Sex, 
        address: string, 
        dataUser:UserRequestDto
    ):Promise<HttpException> => {
        try {
            const update = {
                $set: {
                    ...(name && { name }),
                    ...(sex && { sex }),
                    ...(address && { address }),   
                }, 
            }   
            await this.UserModel.findOneAndUpdate({ _id: dataUser._id}, update).lean().exec();
            return new HttpException("Update information successfull", HttpStatus.OK);
        } catch (error) {
            throw new NotAcceptableException();
        } 
    }

    
    favoriteProduct = async (
        _id: string,
        user: UserRequestDto
    ): Promise<HttpException> =>{
        try { 
            const updateFavorite = await this.UserModel.updateOne({ _id: user._id }, { $push: { favoriteProduct: _id }});
            if(!updateFavorite)
                throw new HttpException(" error favorite ", HttpStatus.BAD_GATEWAY)
            return new HttpException("Favorite product successfull", HttpStatus.OK);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }

    unFavoriteProduct = async (
        _id: string,
        user: UserRequestDto
    ): Promise<HttpException> =>{
        try {
            const updateFavorite = await this.UserModel.updateOne({ _id: user._id }, { $pull: { favoriteProduct: _id }});
            if(!updateFavorite)
                throw new HttpException(" error unfavorite ", HttpStatus.BAD_GATEWAY)
            return new HttpException("UnFavorite product successfull", HttpStatus.OK);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }

    getFavoriteProduct =async ( dataUser: UserRequestDto) => {
        try {
            const user = await this.UserModel
                .findById(dataUser._id)
                .populate({
                    path: 'favoriteProduct',
                    select: '_id name description price picture', // Select the fields you want to retrieve from the 'Product' model
                })
                .lean()
                .exec(); 
            const listProducts = user.favoriteProduct.map((item: any) => { 
                return new FavoriteProductDto(new Object({
                    _id: item._id.toString(),
                    name: item.name,
                    price: item.price,
                    picture: item.picture,
                    description: item.description,
                }));
            });  
            return listProducts;
        } catch (error) { 
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }
}
