import axiosInstance from "./api";  


 
export const getOrderHistory = async(): Promise< any | null> => { 
    try {
        const response = await axiosInstance.get(`order`); 
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
}  


export const getOrderCurrent = async() =>{
    try {
        const response = await axiosInstance.get(`order/current`); 
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const createOrder = async (cartId: string) => {
    try {
        const response = await axiosInstance.post(`order/${cartId}`); 
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
}