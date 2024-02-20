import axios from 'axios';
import { DataProfileUser } from '../types/ProfileUser.interface';


const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/`,
});

const data = localStorage.getItem('user');
if(data){
    const user:DataProfileUser = JSON.parse(data); 
    axiosInstance.interceptors.request.use((config) => {
        // Add bearer token to the Authorization header
        config.headers.Authorization = `Bearer ${user.token}`;
        return config;
    }); 
}

export default axiosInstance;