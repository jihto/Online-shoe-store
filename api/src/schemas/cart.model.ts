import * as mongoose from 'mongoose';  
import { IProduct } from './product.model'; 

interface IProductInCart {
    product: mongoose.Types.ObjectId | IProduct; // Use Types.ObjectId for the reference
    quantity: number;
}

const CartSchema = new mongoose.Schema({   
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }, // Default quantity is 1
        },
    ],
    updatedAt: { type: Date, default: Date.now()},
    totalPrice: { type: Number, default: 0 },
})

CartSchema.methods.addProduct = async function (productId, quantityToAdd = 1) {
    const existingProductIndex = await this.products.findIndex(item =>
        item.product.equals(productId)
    ); 
    
    if (existingProductIndex !== -1) {
        // Product exists, increment quantity
        this.products[existingProductIndex].quantity += quantityToAdd;
    } else {
        // Product doesn't exist, add a new entry
        await this.products.push({
            product: productId,
            quantity: quantityToAdd,
        });   
    }  
    // Save the document
    await this.save();
    return this;
};

CartSchema.methods.removeProduct = async function(productId: string ) {
    const existingProductIndex = await this.products.findIndex(item =>
        item.product.equals(productId)
    );  
    // Product doesn't exist, add a new entry
    await this.products.splice(existingProductIndex, 1);  
    // Save the document
    await this.save();
    return this;
}

export interface ICart extends Document{ 
    _id: mongoose.Schema.Types.ObjectId; 
    products: IProductInCart[];
    updatedAt: Date;
    totalPrice: number;

    addProduct(productId: string, quantityToAdd?: number): Promise<ICart>;
    removeProduct(productId: string): Promise<ICart>;
}
export const Cart = { name:'Cart', schema: CartSchema };