import Heading from "../../conponents/Heading";
import Button from "../../conponents/buttons/Button";
import { useState } from 'react';
import Container from "../../conponents/containers/Container";
import { useLocation, useNavigate } from "react-router-dom";
import useOrderModal from "../../hooks/useOrderModal";
import { ProductCartProps } from "../../types/ProductCart.interface";
import { Comment } from "../../conponents/Comment"; 
import ButtonIcon from "../../conponents/buttons/ButtonIcon";
import ButtonStatic from "../../conponents/buttons/ButtonStatic";
import { CiTurnL1 } from "react-icons/ci";
interface ProductDetailProps{

}

const ProductDetail:React.FC<ProductDetailProps> = () =>{
    const [quantity, setQuantity] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(0);   

    const navigate = useNavigate();
    const orderModal = useOrderModal();
    const { state } = useLocation();
 
    const handleOrder = () => {
        if(state){
            const dataProduct: ProductCartProps = {
                product: state,
                quantity,
            }
            orderModal.setData(dataProduct, state.price * quantity);
            orderModal.onOpen();
        }
    }
    return (
        <Container>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-24 py-5 relative">
                    <ButtonStatic 
                        handleSubmit={()=>navigate('/user/shopping')} 
                        className="absolute z-10 top-4 hover:opacity-75 left-8 shadow-md bg-gray-800 text-white"
                    >
                        <CiTurnL1 />
                        Keep shopping
                    </ButtonStatic>
                <div className="w-full h-fit gap-6 relative flex flex-col px-5 border-gray-300 rounded-xl"> 
                    <div className="flex justify-center gap-5 font-medium">
                        {
                            ['Image Product', 'Revivews'].map((item: string, index: number) => (
                                <ButtonIcon onClick={() => setCurrentPage(index)} outline={currentPage === index ? true : false} key={index}>
                                    {item}
                                </ButtonIcon>
                            ))
                        }
                    </div>
                    { currentPage === 0 ? <img className="shadow-sm max-w-full max-h-[750px] object-contain rounded-3xl bg-gray-200" src={`http://localhost:3000/uploads/images/${state.picture}`}/> : null }
                    { currentPage === 1 ? <Comment productId={state._id}/> : null }

                </div>
                <div className="w-full h-full text-left flex flex-col gap-6">
                    <p className="lg:text-3xl md:text-2xl font-sans  font-bold">{state.name}</p>
                    <hr/>
                    <div className="flex gap-5">
                        <Button outline={true}>Running Shoes</Button>
                        <Button outline={true}>Casual Sneakers</Button>
                        <Button outline={true}>Limited Edition</Button>
                    </div>
                    <Heading header="Product Description:">
                        {state.description}    
                    </Heading> 
                    <div className="grid gap-2">
                        <p className="text-xl font-bold">Size:</p>
                        <div className="flex gap-2 flex-wrap">
                            {
                                [36,37,38,39,40,41,42, 43].map(item => (
                                    <Button outline={true} key={item}>{item}</Button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <p className="text-xl font-bold">Items Quantity:</p>
                        <div className="w-fit h-fit flex justify-center items-center gap-2 bg-white border p-1 rounded-full">
                            <button className="px-2 border-r-2" onClick={()=>setQuantity(prev => prev > 0 ? prev - 1 : 0)}>-</button>
                                {quantity}
                            <button className="px-2 border-l-2" onClick={()=>setQuantity(prev => prev + 1)}>+</button>
                        </div>
                    </div>
                    <p className="text-xl lg:text-2xl font-bold">IDR.{state.price}$</p>
                    <div className="bg-gray-200 p-2 rounded-xl shadow-sm">
                        <Heading header="15% Discount For Membership">
                            Every SEPOKAT membership customers can get 15% discount with minimum $100 shopping
                        </Heading>  
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <ButtonStatic>Add to cart </ButtonStatic>
                        <ButtonStatic handleSubmit={handleOrder}> Buy now </ButtonStatic>
                    </div>   
                </div>
            </div>  
            <hr/> 
        </Container>
    )
}

export default ProductDetail;