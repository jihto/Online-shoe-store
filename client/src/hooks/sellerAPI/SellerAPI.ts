import axios from 'axios'; 


const sellerAPI = axios.create({
    baseURL: `http://localhost:3000/`,
});

const data = localStorage.getItem('seller');
if(data){
    const seller = JSON.parse(data); 
    sellerAPI.interceptors.request.use((config) => {
        // Add bearer token to the Authorization header
        config.headers.Authorization = `Bearer ${seller.token}`;
        return config;
    }); 
}

export default sellerAPI;