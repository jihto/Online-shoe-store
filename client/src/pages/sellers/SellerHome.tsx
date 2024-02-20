 
import { useNavigate } from 'react-router-dom'; 
import AdminContainer from '../../conponents/containers/SellerContainer';   
import { useEffect, useState } from 'react';
import { getProductsSeller } from '../../hooks/sellerAPI/getProductsSeller';
import ButtonIcon from '../../conponents/buttons/ButtonIcon';
import { CiCirclePlus } from 'react-icons/ci'; 
import SellerProduct from '../../conponents/product/SellerProduct'; 
interface SellerHomeProps{
}

const SellerHome:React.FC<SellerHomeProps> = () =>{
    const navigator = useNavigate(); 
    const [products, setProducts] = useState<any[] | null>(null);
    const [inforSeller, setInforSeller] = useState<any | null>(null); 
    const listInformation = [
        {name: "Name Seller Home", number: inforSeller && inforSeller.name},
        {name: "Email", number: inforSeller && inforSeller.email},
        {name: "Number Product", number: products?.length},
        {name: "Total Price", number: "0"},
    ]  
    
    useEffect(()=>{
        const seller = localStorage.getItem("seller");
        if(seller)
            setInforSeller(JSON.parse(seller));

        getProductsSeller()
            .then(data => setProducts(data))
            .catch(err =>  setProducts(null));
    },[]); 
    return( 
        <AdminContainer>
            <div className={`fixed grid w-[87%] gap-2`}>
                <div className='m-1 relative'>
                    <div className='bg-[#5046a5] mb-10 flex gap-5 text-white pt-5 rounded-t-xl px-4'>
                        {
                            listInformation.map((item, index) => (
                                <div key={index} className='relative px-5 my-10 after:absolute after:-right-3 after:top-0 after:w-px after:h-full after:bg-white after:rounded-lg'>
                                    <p className='text-sm'>{item.name}</p>
                                    <p className='text-2xl font-medium'>{item.number}</p>
                                </div> 
                            ))
                        } 
                    </div>  
                    <div className='absolute bottom-10 right-10 z-20 hover:shadow-2xl hover:opacity-80'>
                        <ButtonIcon 
                            onClick={()=>navigator('/admin/product/detail/1')} 
                            className='shadow-lg text-white bg-[#5046a5]' 
                            sizeIcon='large'
                            icon={CiCirclePlus}
                        /> 
                    </div>  
                    <SellerProduct/>
                </div>  
            </div>
        </AdminContainer> 
    )

}

export default SellerHome;