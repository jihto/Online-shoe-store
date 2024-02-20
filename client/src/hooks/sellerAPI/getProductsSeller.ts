import sellerAPI from "./SellerAPI";



export const getStatistic = async(): Promise<any | null> => { 
    try {
        const response = await sellerAPI.get(`product/statistic`);  
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
} 
 
export const getProductsSeller = async(): Promise< any | null> => { 
    try {
        const response = await sellerAPI.get('product/admin'); 
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
}  

export const getProductDeleted = async(): Promise< any | null> => { 
    try {
        const response = await sellerAPI.get('product/isDeleted'); 
        return response.data; 
    } catch (error) {
        console.log(error);
        return null;
    }
}  

export const createProduct = async (data: FormData) => {
    try {
        const response = await sellerAPI.post('product/create', data);
        return response.data;
    } catch (error) {
        return null;
    }
}
export const updateProduct = async (_id:string , data: FormData) => {
    try {
        const response = await sellerAPI.put(`product/update/${_id}`, data); 
        return response.data;
    } catch (error) {
        return null;
    }
}


export const deleteProduct = async (_id:string) => {
    try {
        const response = await sellerAPI.post(`product/delete/${_id}`); 
        return response.data;
    } catch (error) {
        return null;
    }
}
export const restoreProduct = async (_id:string) => {
    try {
        const response = await sellerAPI.post(`product/restore/${_id}`); 
        return response.data;
    } catch (error) {
        return null;
    }
}

