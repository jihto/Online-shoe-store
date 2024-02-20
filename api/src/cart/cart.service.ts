import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserRequestDto } from 'src/common/dtos/UserRequestDto';
import { ICart } from 'src/schemas/cart.model';
import { IProduct } from 'src/schemas/product.model';
import { IUser } from 'src/schemas/user.model'; 

@Injectable()
export class CartService {
    constructor(
        @InjectModel('Cart') private readonly CartModel:Model<ICart>,
        @InjectModel('User') private readonly UserModel:Model<IUser>,
        @InjectModel('Product') private readonly ProductModel:Model<IProduct>,
    ){}
    
    private calculateTotalPrice = async(cartId: mongoose.Schema.Types.ObjectId): Promise<number> => {
        const calculateTotalPrice = await this.CartModel.aggregate([
            { $match: { _id: cartId } },
            { $unwind: '$products',}, // Unwind the products array
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product', // Use the correct path to the product reference
                    foreignField: '_id',
                    as: 'productData',
                },
            },
            { $unwind: '$productData',}, // Unwind the productData array
            {
                $group: {
                    _id: '$_id',
                    totalPrice: {
                        $sum: { $multiply: ['$productData.price', '$products.quantity'],}, // Multiply price by quantity
                    },
                },
            },
        ]); 
        return calculateTotalPrice[0].totalPrice;
    }

    getProductsInCart =async (
        cartId: string
    ) => {
        try{ 
            const response = await this.CartModel.findById(cartId)
                .populate({
                    path: 'products.product',
                    select: 'name description price picture', // Select the fields you want to retrieve from the 'Product' model
                })
                .lean()
                .exec();  
            const products = response?.products?.map((productEntry: any) => {
                return {
                    product: {
                        _id: productEntry.product?._id.toString(),
                        name: productEntry.product?.name,
                        description: productEntry.product?.description,
                        price: productEntry.product?.price,
                        picture: productEntry.product?.picture,
                    },
                    quantity: productEntry.quantity,
                };
                }) || []; 
            return { 
                totalPrice:response.totalPrice, 
                products
            };
        }catch(error){
            throw new NotAcceptableException(error.message); 
        } 
    }

    addItemToCart = async (
        productId:string, 
        dataUser: UserRequestDto,
    )=>{ 
        try {
            const userId = dataUser._id; 
            const user = await this.UserModel.findOne({ _id: userId });
            if (user && user.cart) {    
                //Checking cart is exist 
                const idIsExistInCart = await this.CartModel.findById(user.cart); 
                //check add product to array or increase quantity
                const result = await idIsExistInCart.addProduct(productId);  
                //calculate Total Price of all product  
                const totalPrice = await this.calculateTotalPrice(user.cart);
                //Update price of the cart
                await this.CartModel.updateOne({_id: result._id},{ totalPrice }) 
                return new HttpException(user.cart.toString(), HttpStatus.OK);
            } else {
                // The user does not exist or the cart field is empty
                const getPrice = await this.ProductModel.findOne({ _id: productId }).select('price').lean(); 
                const newCart = new this.CartModel({
                    products:{product: productId, quantity:1},
                    totalPrice: getPrice.price,
                }) 
                await newCart.save(); 
                await user.updateOne({ cart: newCart._id }).lean(); 
                return new HttpException(newCart._id.toString(), HttpStatus.OK);
            } 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }

    removeItemFromCart =async (
        productId: string,
        dataUser: UserRequestDto,
    ):Promise<HttpException> => {
        try{   
            const userId = dataUser._id; 
            const user = await this.UserModel.findOne({ _id: userId });
            if (user && user.cart) {    
                const idIsExistInCart = await this.CartModel.findById(user.cart); 
                const result = await idIsExistInCart.removeProduct(productId);  
                const totalPrice = await this.calculateTotalPrice(user.cart);
                await this.CartModel.updateOne({_id: result._id},{ totalPrice }) 
                return new HttpException("Remove Item Successfull", HttpStatus.OK);
            }
            return new HttpException("Error", HttpStatus.BAD_GATEWAY);
        }catch(error){
            throw new NotAcceptableException(error.message);
        } 
    }
}
