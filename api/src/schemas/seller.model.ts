import * as mongoose from 'mongoose';  
import { IAuth } from './auth.model';
import { IProduct } from './product.model';

const SellerSchema = new mongoose.Schema({ 
    name: { type: String, require: true, unique: true},
    address: { type: String},   
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
    products: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
})
export interface ISeller extends Document{ 
    _id:mongoose.Schema.Types.ObjectId; 
    name: string;
    address: string;
    account: IAuth['_id'];
    products: IProduct['_id'][];
}

export const Seller = { name:'Seller', schema: SellerSchema };