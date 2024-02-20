import * as mongoose from 'mongoose';  
import { IAuth } from './auth.model';
import { IProduct } from './product.model';
import { IUser } from './user.model';

const CommentSchema = new mongoose.Schema({ 
    content: { type: String, require: true},
    picture: { type: String, require: false},
    timeStamp: { type: Date, default: Date. now},   
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, require:true , ref: "Product" },
})
export interface IComment extends Document{ 
    _id:mongoose.Schema.Types.ObjectId; 
    picture: string;s
    content: string;
    timeStamp: Date;
    user: IUser['_id'];
    product: IProduct['_id'];
}

export const Comment = { name:'Comment', schema: CommentSchema };