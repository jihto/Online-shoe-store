import { toast } from "react-toastify";
import { CommentDto } from "../types/Comment.interface";
import axiosInstance from "./api";

export const getComments = async(productId:string): Promise< CommentDto[] | []> => { 
    try {
        const response = await axiosInstance.get(`comment/${productId}`); 
        return response.data; 
    } catch (error) {
        console.log(error);
        return [];
    }
}  


export const createComment = async (productId: string, formData: FormData): Promise<CommentDto | null> => {
    try {
        const response = await axiosInstance.post(`comment/create/${productId}`, formData); 
        return response.data; 
    } catch (error: any) {
        toast.error(error.response.data.message);
        return null;
    }
}