import { toast } from "react-toastify"; 
import Button from "../buttons/Button";
import FormField from "../inputs/FormField";
import ProductCart from "../product/ProductCart";
import Modal from "./Modal";
import { useEffect, useState } from 'react';
import { createOrder } from "../../hooks/getOrder"; 
import useOrderModal from "../../hooks/useOrderModal";
import { ProductCartProps } from "../../types/ProductCart.interface";
 

const OrderModal: React.FC = () => {
    const user = localStorage.getItem("user");
    const orderModal = useOrderModal(); 
    const [cartId, setCartId] = useState<string>(''); 
    useEffect(() => {
        if(user)
            setCartId(JSON.parse(user).cart);
    },[])
    
    const handleSubmitOrder = async() => {
        try {
            const response = true
            await createOrder(cartId); 
            if(!response)
                throw new Error();
            if(response && user){
                const dataUser = JSON.parse(user) 
                localStorage.setItem("user",JSON.stringify({...dataUser, cart: null}));
            }
                
            orderModal.onClose();
            toast.success("Order successfull");
        } catch (error) {
            toast.error("Order fail!!")
        }
    }
    return (
        <Modal
            isOpen={true}
            className="w-[98%] lg:w-1/3 h-5/6"
            content={<Content 
                totalPriceAllProduct={orderModal.totalPriceAllProduct} 
                dataProduct={orderModal.dataProduct}
                handleSubmitOrder={handleSubmitOrder}
                isAction={true}
            />}
            hanldeClose={orderModal.onClose}
        />
    )
} 
interface ContentProps{
    dataProduct: ProductCartProps[] | null | ProductCartProps;
    totalPriceAllProduct: number | undefined;
    handleSubmitOrder: ()=>void;
    isAction?: boolean;
}

const Content : React.FC<ContentProps> = ({
    dataProduct, 
    totalPriceAllProduct,
    handleSubmitOrder,
    isAction
} ) => {   
    const dataUser = localStorage.getItem("user");
    let user ;
    if(dataUser)
        user = JSON.parse(dataUser);

    const [dataOrder, setDataOrder] = useState<string>(""); 
    return (
        <div className="grid gap-3">
            <p className="text-2xl font-medium">Order:</p>
            <hr/>
            <p className="font-medium">Information customer: </p>
            <div className="grid grid-cols-[20%,70%] justify-center items-center gap-3"> 
                <FormField 
                    labelName="Name"
                    name="name" 
                    placeholder="Name..."
                    value={user.name}
                    handleChange={e => setDataOrder(e.target.value)}
                />   
                <FormField 
                    labelName="Address: "
                    name="address" 
                    placeholder="Input your location"
                    value={user.address}
                    handleChange={e => setDataOrder(e.target.value)}
                />  
                <FormField 
                    labelName="Email: "
                    name="email" 
                    placeholder="Input your email"
                    value={user.email}
                    handleChange={e => setDataOrder(e.target.value)}
                /> 
            </div> 
            <div className="grid overflow-x-hidden overflow-auto touch-pan-x h-[250px]">
                {
                    Array.isArray(dataProduct) && dataProduct.length > 0
                        ? dataProduct.map((item: any, index: number) => <ProductCart key={index} dataProduct={item} disableButton={true} />)
                        : <ProductCart dataProduct={dataProduct}  disableButton={true}/>  
                }  

            </div>
            <hr/>
            <div className="text-base my-5"> 
                <p><strong>Sub Total: </strong>{totalPriceAllProduct} $</p>
                <p><strong>Discount(15%)</strong> -33$</p>
                <p><strong>Shipping Fee:</strong>+5</p>
                <p><strong>Total: </strong>{Number(totalPriceAllProduct) - 33 + 5}$</p>
            </div>
            {
                isAction 
                    ? <div className="grid grid-cols-2 gap-5">
                            <Button className="bg-gray-50">Cancel</Button>            
                            <Button onClick={handleSubmitOrder}>Purchase</Button>
                        </div>
                    : null
            } 
        </div>
    )
}
export default OrderModal;