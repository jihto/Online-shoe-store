import Box from "../../conponents/Box";
import Button from "../../conponents/buttons/Button"; 
import { useState } from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import FormField from "../../conponents/inputs/FormField";
import { toast } from "react-toastify";
import api from "../../hooks/api"; 
interface SellerLoginProps{

}

const SellerLogin:React.FC<SellerLoginProps> = () =>{
    const [ formData, setFormData] = useState<{ email: string, password: string }>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();  

    const handleSubmitLogin =async () => {
        try { 
            if(formData){
                const response = await api.post('admin/signin', formData); 
                if(!response.data)
                    toast.error("Some thing wrong when login");
                localStorage.setItem("seller", JSON.stringify(response.data));
                toast.success("Login successfull"); 
            }
        } catch (error: any) { 
            toast.error(error.response.data.message);
        } finally{
            navigate('/admin/home');
        }
    }
    return( 
        <Box className="absolute py-[3%] top-1/4 w-[98%] left-[1%] border-[2px] md:left-1/4 lg:left-1/3 md:w-1/2 lg:w-1/3 shadow-lg bg-gray-400"> 
            <div className="grid gap-8 w-2/3">
                <p className="text-black text-2xl font-medium">Login Seller:</p> 
                <FormField
                    labelName="Email"
                    value={formData.email}
                    placeholder="Email..."
                    name="email"
                    handleChange={(e)=>setFormData({...formData, email:e.target.value})}
                />
                <FormField
                    labelName="Password"
                    value={formData.password}
                    placeholder="password..."
                    name="password"
                    handleChange={(e)=>setFormData({...formData, password:e.target.value})}
                    type="password"
                />
                <Button onClick={handleSubmitLogin}>Login</Button>
            </div>
        </Box>  
    )

}

export default SellerLogin;