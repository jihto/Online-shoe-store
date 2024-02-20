import { useState, useEffect } from 'react';  
import ButtonIcon from "../buttons/ButtonIcon";  
import Container from "../containers/Container";
import { useNavigate } from "react-router-dom";  
import { CiShoppingBasket, CiUser } from 'react-icons/ci';
import useLoginModal from '../../hooks/useLoginModal';
import { listMenu } from '../../constant';
  
interface DataUser{
    name: string;
    _id: string;
    token: string;
    email: string
}

const Navbar: React.FunctionComponent = () => {  
    const [currentPage, setCurrentPage] = useState<string>(listMenu[0].path);  
    const [isLogin, setIsLogin] = useState<DataUser | null>(null); 
    const loginModal = useLoginModal();


    const currentLogin = localStorage.getItem("user");
    useEffect(()=>{ 
        if(currentLogin)
            setIsLogin(JSON.parse(currentLogin));
        else 
            setIsLogin(null)
    },[currentLogin]);

    const navigate = useNavigate();  
    const [scrollPosition, setScrollPosition] = useState<number>(0); 
    useEffect(() => { 
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            setScrollPosition(scrollY);
        });
    },[]); 

    return ( 
        <Container p_page={false} className="fixed w-full z-20 bg-white lg:pt-5 justify-center border-b-2 grid grid-cols-2">
            <div className="flex-1 flex justify-start gap-5 items-center"> 
                <ButtonIcon onClick={()=> navigate("/user")}>
                    <p className="text-base lg:text-xl font-bold"> T-Spiration </p>
                </ButtonIcon> 
            </div>  
            <div className="flex-1 w-full justify-end items-end">  
                <div className="flex gap-5 justify-end">  
                    {
                        isLogin
                            ? <ButtonIcon sizeIcon='medium' onClick={() => navigate('/user/profile')} icon={CiUser} label={isLogin.name} />
                            : <ButtonIcon sizeIcon='medium' icon={CiUser} onClick={() => loginModal.onOpen()} />
                    }
                    
                    <ButtonIcon sizeIcon='medium' icon={CiShoppingBasket } onClick={() => navigate('/user/cart')}> 
                        <div className="absolute -top-1 -right-1 bg-yellow-400 w-4 h-4 rounded-full text-xs font-medium text-black flex justify-center items-center"></div>
                    </ButtonIcon>
                </div>
            </div>
            <div className="flex">
                {
                    scrollPosition === 0 
                        ? listMenu.map((item, index) => 
                            <ButtonIcon 
                                onClick={()=> {
                                    navigate(item.path)
                                    setCurrentPage(item.path);
                                }} 
                                key={index} 
                                outline={currentPage === item.path ? true : false}
                                label={item.name}    
                            />  
                        )
                        : null
                }
            </div>
        </Container> 
    )
}


export default Navbar;