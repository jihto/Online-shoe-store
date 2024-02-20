import axiosInstance from "./api";
import { ProductProps } from "../types/Product.interface";
 

export const getProducts = async(search= '', sort = ''): Promise<ProductProps[] | []> => { 
    try {
        const response = await axiosInstance.get(`product/?search=${search}&sort=${sort}`);  
        return response.data; 
    } catch (error) {
        console.log(error);
        return [];
    }
} 

export const favoriteProduct  =async (productId: string) => {
    try {
        const response = await axiosInstance.put(`user/favorite/product/${productId}`); 
        return response.data; 
    } catch (error) {
        console.log(error);
    }
}

export const unFavoriteProduct  =async (productId: string) => {
    try {
        const response = await axiosInstance.put(`user/unfavorite/product/${productId}`); 
        return response.data; 
    } catch (error) {
        console.log(error);
    }
}