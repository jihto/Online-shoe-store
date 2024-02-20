import { useEffect, useState } from 'react';
import ButtonIcon from '../buttons/ButtonIcon';
import { CiTrash } from 'react-icons/ci';
import { deleteProductFromCart } from '../../hooks/getProductInCart';
import { toast } from 'react-toastify';
interface ProductCartProps{
    disableButton?: boolean;
    dataProduct: any;
    setTotalAllProduct?: any;  
}

const ProductCart:React.FC<ProductCartProps>  = ({
    dataProduct,
    setTotalAllProduct,
    disableButton = false,
}) => {      
    const [quantity, setQuantity] = useState<number>(Number(dataProduct.quantity));
    const [totalPrice, setTotalPrice] = useState<number>(dataProduct.product ? Number(dataProduct.product.price) * Number(dataProduct.quantity) : 0);
    const [showProduct, setShowProduct] = useState<boolean>(true);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    useEffect(()=>{
        if(dataProduct && dataProduct.product){ 
            const currentPrice: number = Number(dataProduct.product.price) * quantity;
            setTotalAllProduct && setTotalAllProduct((prev: number) => prev - totalPrice +  currentPrice);
            setTotalPrice(currentPrice);
        }
    },[quantity]);

    const handleDeleteProduct = async() => {
        try {
            setIsDelete(true);
            const productId = dataProduct.product._id; 
            await deleteProductFromCart(productId); 
            setShowProduct(false);
            toast.success("Remove product from the cart successfull");
        } catch (error: any) {
            toast.error(error);
        } finally{
            setIsDelete(false);
        }
    }

    return (  
        <div className={`grid gap-2 ${ isDelete && 'opacity-30  '}`}>
            {
                dataProduct.product && quantity > -1 && showProduct
                ? <>
                    <hr/>
                    <div className="grid grid-cols-5 justify-center items-center gap-5">
                        <img className="py-5 bg-gray-200 w-[200px] object-contain h-[100px] rounded-xl" src={`http://localhost:3000/uploads/images/${dataProduct.product.picture}`}/>
                        <div>
                            <p>{dataProduct.product.name}</p>
                            <p>{dataProduct.product.price}$</p> 
                        </div>
                        <div className="flex gap-5 items-center justify-center">
                            { disableButton || <button onClick={() => setQuantity(quantity > -1 ? quantity-1 : 0)} className="text-3xl hover:opacity-75">-</button>}
                            <p>{quantity}</p>
                            { disableButton || <button onClick={() => setQuantity(quantity+1)} className="text-3xl hover:opacity-75">+</button>}
                        </div>
                        <p>{totalPrice}$</p>
                        {
                            disableButton 
                                ? null
                                :<ButtonIcon className='text-red-700' onClick={handleDeleteProduct}>
                                    <CiTrash size={24}/>
                                </ButtonIcon> 
                        }
                    </div>
                    </>
                : null
            } 
        </div>
    )
}

export default ProductCart;