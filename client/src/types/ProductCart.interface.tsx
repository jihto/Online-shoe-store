import { ProductProps } from "./Product.interface";

export interface ProductCartProps{
    product: ProductProps;
    quantity: number;
}

export interface ProductCartDetailProps{  
    products: ProductCartProps[];
    totalPrice: number;  
}