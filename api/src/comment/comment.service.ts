import { HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComment } from 'src/schemas/comment.model';
import { IProduct } from 'src/schemas/product.model';
import { CommentDto } from './comment.dto';
import { convertToPlainObject } from 'src/common/utils/convertMongooseToObject';
import { IOrder, Order } from 'src/schemas/order.model';
import { ICart } from 'src/schemas/cart.model';
import * as ImageHash from 'image-hash'; 

@Injectable()
export class CommentService {
    constructor( 
        @InjectModel('Product') private readonly ProductModel:Model<IProduct>,
        @InjectModel('Comment') private readonly CommentrModel:Model<IComment>,
        @InjectModel('Cart') private readonly CartModel:Model<ICart>,
        @InjectModel('Order') private readonly OrderModel:Model<IOrder>,
    ) { }

    private isProducthasPurchased = async(userId: string, productId: string):Promise<boolean> => {
        const orders = await this.OrderModel.find({ buyer: userId });
        
        console.log(orders,userId); 
        for (const order of orders) {
            const cart = await this.CartModel.findById(order.cart).exec();
            if (cart) {
                const productExistsInCart = cart.products.some(item => item.product.toString() === productId);
                if (productExistsInCart) {
                    return true;
                }
            }
        }
        return false;
    }

    async getCommentInProduct(productId:string): Promise<CommentDto[]>{  
        try{ 
            const listsComment = 
                await this.CommentrModel
                    .find({ product: productId }) // Checking which product contain letter in search
                    .populate({
                        path: "user",
                        select: "name "
                    })
                    .lean();  
            return listsComment.map(product => new CommentDto(product));
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
    }

    private calculateImageHash (imagePath: string):Promise<string>{
        return new Promise((resolve, reject) => {
            ImageHash.imageHash(imagePath, 16, true, (error, hashData) => {
                if (error) {
                    reject(error);
                } else {
                    // Resolve the Promise with the hashData
                    resolve(hashData);
                }
            });
        })
    }; 
    private calculateHammingDistance(hash1: string, hash2: string): number {
        let distance = 0;
        for (let i = 0; i < hash1.length; i++) {
            if (hash1[i] !== hash2[i]) {
                distance++;
            }
        }
        return distance;
    }

    async createComment(
        productId: string, 
        content: string, 
        file: Express.Multer.File,
        user: string
    ):Promise<CommentDto> {
        try { 
            const isExist = await this.isProducthasPurchased(user, productId);
            if(file){
                const queryHash = await this.calculateImageHash(file.path);
                //Get all product in db
                const product = await this.ProductModel.findOne({ _id: productId }).lean().exec()
                // Find products with similar image hashes 
                console.log({queryHash, pic: product.pictureHash});
                const hammingDistance = this.calculateHammingDistance(queryHash, product.pictureHash);  
                if(hammingDistance >= 5)
                    throw new HttpException("That isn't same with Product", HttpStatus.BAD_REQUEST);
            }
            if(isExist){
                const newComment = await this.CommentrModel.create({
                    product : productId ,
                    content,
                    user,
                    ...( { picture: file ? file.filename : ''} ), 
                });  
    
                await newComment.populate('user');
                return new CommentDto(convertToPlainObject(newComment))
            }
            throw new UnauthorizedException("You haven't purchased the product");
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }


    async updateComment(_id: string, newContent: string){ 
        const comment = await this.CommentrModel.findById({ _id });
        if(!comment)
            throw new HttpException("Not find Comment", HttpStatus.BAD_REQUEST);
        let dataUpdate = {
            $set:{
                content: newContent,
            }
        };
        const update = await comment.updateOne(dataUpdate);
        if(!update)
            throw new HttpException("Update Fail", HttpStatus.BAD_GATEWAY)

        return new HttpException("Update Successfull", HttpStatus.OK); 
    }
}
