import { useNavigate } from "react-router-dom";
import Button from "../../conponents/buttons/Button";
import ProductCart from "../../conponents/product/ProductCart";
import { useEffect, useState } from "react";
import getProductInCart from "../../hooks/getProductInCart";
import Container from "../../conponents/containers/Container";
import { ProductCartDetailProps } from "../../types/ProductCart.interface";  
import useOrderModal from "../../hooks/useOrderModal";
export interface CartProps{}

const Cart: React.FunctionComponent<CartProps> = () =>  {
    const navigation = useNavigate()
    const [data, setData] = useState<ProductCartDetailProps | null>(null);
    const user = localStorage.getItem("user");  
    const orderModal = useOrderModal();
    console.log(data)
    useEffect(() => {
        if(user){
            const cartId: string = JSON.parse(user).cart;
            getProductInCart(cartId)
                .then(data => setData(data))
                .catch(err => setData(null))
        } 
    }, []);
    const handleOrder = () => {
        if(data){
            orderModal.setData(data.products, data.totalPrice);
            orderModal.onOpen();
        }
    }
    return (
        <Container>
            <div className="flex flex-col gap-12 mx-[1%] lg:mx-[10%] justify-between">
                <p className="text-3xl font-bold">Shopping Cart</p>
                <div className="grid lg:grid-cols-2 lg:justify-items-end w-full">
                    <div className="w-full flex flex-col gap-2">
                        <div className="grid w-full grid-cols-5">
                            <p></p>
                            <p>Product</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total Price</p>
                        </div>
                        {
                            data && data.products.map((item: any, index: number) => (
                                <ProductCart dataProduct={item} key={index}/>
                            ))
                        } 
                        <Button outline={true} onClick={()=>navigation('/user')}>Update Cart</Button>
                    </div>
                    <div className="border-2 rounded-3xl w-full lg:w-3/4 grid gap-8 my-4 p-10">
                        <p className="text-xl font-medium">Order Sumery</p>
                        <div className="flex justify-between gap-10">
                            <Button outline={true}>Discount Voucher</Button>
                            <Button>Apply</Button>
                        </div>
                        <div className="grid grid-cols-2 text-gray-900 gap-3">
                            <p>Sub Total: </p>
                            <p>2.00$</p>
                            <p>Discount(15%)</p>
                            <p>-10$</p>
                            <p>Shipping Fee: </p>
                            <p>+5$</p>
                            <p>Total: </p>
                            <p>{data?.totalPrice}$</p>
                        </div>
                        <Button onClick={handleOrder}>Checkout Now</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}


export default Cart;
