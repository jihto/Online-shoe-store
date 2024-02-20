import Container from "../containers/Container";  
import Modal from "./Modal" 
import { useState } from 'react';
import Button from "../buttons/Button";
import FormField from "../inputs/FormField";
import api from "../../hooks/api";
import { toast } from "react-toastify";
import useLoginModal from "../../hooks/useLoginModal";
import ButtonStatic from "../buttons/ButtonStatic";
 

interface DataUser{
    email: string;
    password: string;
    name: string;
    address: string;
}

const LoginModal: React.FC= () => {
    const loginModal = useLoginModal(); 
    const [dataUser, setDataUser] = useState<DataUser>({
        email: '',
        password: '',
        name: '',
        address: '',
    }); 
    const [isSignUp, setIsSignUp] = useState<boolean>(false); 

    const handleLogin = async () => {
        try { 
            if(dataUser.email){
                // if(dataUser.password.length > 8){
                    const response = await api.post('auth/login', dataUser); 
                    if(!response.data)
                        toast.error("Some thing wrong when login");
                    localStorage.setItem("user", JSON.stringify(response.data));
                    toast.success("Login successfull");
                    loginModal.onClose(); 
                // }else{
                //     toast.warn("Password must be more than 8 characters")
                // }
            }else{
                toast.warn("Please fill all fields")
            }
        } catch (error: any) { 
            toast.error(error.response.data.message);
        }  
    }
    const handleRegister = async() => {
        try { 
            if(dataUser){
                console.log(dataUser);
                // const response = await api.post('auth/login', dataUser); 
                // if(!response.data)
                //     toast.error("Some thing wrong when login");
                // localStorage.setItem("user", JSON.stringify(response.data));
                // toast.success("Login successfull");
                // loginModal.onClose(); 
            }
        } catch (error: any) { 
            toast.error(error.response.data.message);
        }  
    }
    return (
        <Modal
            isOpen={loginModal.isOpen} 
            className="md:w-2/3 lg:w-1/3 h-fit"
            hanldeClose={loginModal.onClose} 
            content={
                <div className="px-10 lg:px-20">
                    <div className="flex justify-center">
                        <p className="text-3xl font-bold">{isSignUp ? "Sign Up" : "Log In"}</p>
                    </div>
                    <div className="grid gap-2 mt-6"> 
                        <FormField 
                            labelName="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email..."
                            value={dataUser.email}
                            handleChange={e=>setDataUser({...dataUser, email: e.target.value})}
                        />
                        <div className={`${isSignUp ? 'w-full' : 'w-0'} transition-[1000ms]`}>
                            {isSignUp
                                ? <div className="grid gap-3">
                                    <FormField 
                                        labelName="Name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter name..."
                                        value={dataUser.name}
                                        handleChange={e=>setDataUser({...dataUser, name: e.target.value})}
                                    /> 
                                    <FormField 
                                        labelName="Address"
                                        name="address"
                                        type="text"
                                        placeholder="Enter your email..."
                                        value={dataUser.address}
                                        handleChange={e=>setDataUser({...dataUser, address: e.target.value})}
                                    />
                                </div>
                                : null
                            }        
                        </div>
                        <FormField 
                            labelName="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password..."
                            value={dataUser.password}
                            handleChange={e=>setDataUser({...dataUser, password: e.target.value})}
                        /> 
                        <div className="flex justify-between">
                            <p>Forget password?</p>
                            <p className="font-bold underline cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>Sign Up</p>
                        </div>
                        <ButtonStatic handleSubmit={ isSignUp ? handleRegister : handleLogin}>{isSignUp ? "Send" : 'Submit'} </ButtonStatic> 
                    </div> 
                </div>
            }
        />
    )
}


export default LoginModal;
