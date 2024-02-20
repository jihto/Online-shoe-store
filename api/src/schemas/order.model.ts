import * as mongoose from 'mongoose';  
import { IProduct } from './product.model';
import { Payment } from 'src/common/types/Payment.enum';
import { IUser } from './user.model';
import { ICart } from './cart.model';

const OrderSchema = new mongoose.Schema({   
    dateOfPurchase: { type: Date, default: Date.now(), require: true },
    payment: { type: String, enum: [Payment.CART, Payment.CASH], default: Payment.CASH ,require: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    isDelivered: { type: Boolean, default: false, require: true },
    pricePurchase: { type: Number, default: 0, require: true },
})
export interface IOrder extends Document{ 
    _id: mongoose.Schema.Types.ObjectId;
    dateOfPurchase: string;
    payment: Payment;
    cart: ICart['_id'];
    buyer: IUser['_id'];
    isDelivered: boolean;
    pricePurchase: number;
}

export const Order = { name:'Order', schema: OrderSchema };