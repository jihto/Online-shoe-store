import { CiShoppingCart, CiWavePulse1, CiMenuKebab, CiUser, CiTrash, CiSettings, CiLogout } from 'react-icons/ci';
import ButtonMenu from '../buttons/ButtonMenu';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
 
export interface menuListsProps{
    name: string;
    icon:IconType;
    path: ListNavbar;
}

const menuLists:menuListsProps[] = [
    {name: 'Products', icon: CiShoppingCart, path:'/admin/home'},
    {name: 'Summaries', icon: CiWavePulse1 , path:'/admin/summaries'}, 
    { name: 'Deleted ', icon: CiTrash, path:'/admin/trash'}, 

]

type ListNavbar = "/admin/home" | "/admin/summaries" | '/admin/trash';

const SellerNavbar:React.FC = () => { 
    const navigate:NavigateFunction = useNavigate();
    const [currentPage, setCurrentPage] = useState<ListNavbar>("/admin/home");
    useEffect(()=>{
        const currentURL: any = window.location.href;
        setCurrentPage(currentURL.slice(14))
    },[]); 

    return (
        <div className="flex flex-col w-[12%] justify-between gap-4 rounded-r-xl bg-gray-100 h-full p-4 fixed">
            <div className='grid gap-5 w-full'>
                <p className='text-xl font-medium mb-10'>T-Spiration</p>
                <ButtonMenu
                className='py-8'
                active={true}
                    label='$12.557'
                    icon={CiMenuKebab}
                />
                <div className=''>
                    {
                        menuLists.map((item:menuListsProps,index: number) => 
                            <ButtonMenu 
                                active={currentPage.includes(item.path)} 
                                key={index} 
                                label={item.name} 
                                icon={item.icon} 
                                onClick={()=> {
                                    setCurrentPage(item.path);
                                    navigate(`${item.path}`);
                                }}/>
                            )
                    }
                </div>
                </div>
            <div className='mt-[10%]'>
                <ButtonMenu icon={CiLogout} onClick={()=> navigate('/login')} label='Logout'></ButtonMenu>
            </div> 
        </div>
    )
}


export default SellerNavbar;