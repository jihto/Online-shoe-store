import axiosInstance from "./api"; 
import { ProductCartDetailProps } from "../types/ProductCart.interface";


 
const getProductInCart = async(cartId: string): Promise< ProductCartDetailProps | null> => { 
    try {
        const response = await axiosInstance.get(`cart/${cartId}`); 
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
} 
export default getProductInCart;

export const addProductToCart = async(productId: string): Promise<any | []> => {
    try {
        const response = await axiosInstance.post(`cart/addItem/${productId}`); 
        return response.data;
    } catch (error) {
        return [];
    }
}


export const deleteProductFromCart = async(productId: string): Promise<any | null> => { 
    try {
        const response = await axiosInstance.post(`cart/removeItem/${productId}`);
        if(!response)
            throw new Error();
        return response.data;
    } catch (error) {
        return null;
    }
}