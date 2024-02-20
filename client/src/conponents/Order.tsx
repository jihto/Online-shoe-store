import { useEffect, useState } from "react";
import { getOrderCurrent } from "../hooks/getOrder";
import { CiDeliveryTruck, CiEdit, CiGift, CiInboxIn } from "react-icons/ci";
import ProductCart from "./product/ProductCart";

const Order:React.FC = () =>{
    const [order, setOrder] = useState<any | null>(null); 
    useEffect(()=>{
        getOrderCurrent()
            .then(data => setOrder(data))
            .catch(err => setOrder(null)) 
    },[])
    return (
        <>
            {
                order
                    ?
                        <>
                            <section className="flex mt-10 gap-5 justify-center w-full">
                                <p>Order current:</p>
                                <div className="w-1/2 flex justify-between px-8 border-b-2">
                                    <CiEdit size={32}/>
                                    <CiInboxIn size={32}/>
                                    <CiDeliveryTruck size={32}/>
                                    <CiGift size={32}/>
                                </div>
                            </section>
                            <section className="grid overflow-x-hidden overflow-auto touch-pan-x max-h-[500px] mt-10">
                                { 
                                    order.products.map((item: any, index: number) => 
                                        <ProductCart 
                                            key={index} 
                                            dataProduct={item} 
                                            disableButton={true}
                                        />
                                    ) 
                            }
                            </section>
                            <div className="mt-10 flex justify-between px-[20%] text-xl font-medium"> 
                                <p> Total: </p>
                                <p>{order.totalPrice}$</p>
                            </div>
                        </>
                    :null
            }
        </>
    )
}
 

export default Order;