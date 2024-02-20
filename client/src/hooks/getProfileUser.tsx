import axiosInstance from "./api"; 
import { DataProfileUser } from "../types/ProfileUser.interface";



const getProfileUser = async(): Promise<DataProfileUser | null> => { 
    try {
        const response = await axiosInstance.get(`user`);  
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
} 
export default getProfileUser;


export const getFavoriteProduct =async () => {
    try {
        const response = await axiosInstance.get(`user/favorite/product`);  
        return response.data; 
    } catch (error) {
        console.log(error);
    }
}