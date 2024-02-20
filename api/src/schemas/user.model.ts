import mongoose, { Document, Schema, Types } from 'mongoose'; // Updated import statement

import { IAuth } from './auth.model';
import { Sex } from 'src/common/types/Sex.enum';
import { ICart } from './cart.model';
import { IProduct } from './product.model';

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Fix typo here
    address: { type: String },
    sex: { type: String, enum: [Sex.MALE, Sex.FEMALE], default: Sex.MALE }, // Updated type and enum
    cart: { type: Types.ObjectId, ref: 'Cart' },
    account: { type: Types.ObjectId, ref: 'Auth' },
    favoriteProduct: [{ type: Types.ObjectId, ref: 'Product' },]
});

export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    address: string;
    sex: Sex;
    cart: ICart['_id'];
    account: IAuth['_id'];
    favoriteProduct: IProduct['_id'][]
}

export const User = { name: 'User', schema: UserSchema };
