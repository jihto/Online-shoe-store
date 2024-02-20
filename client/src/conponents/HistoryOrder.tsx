import moment from "moment";
import ButtonStatic from "./buttons/ButtonStatic"; 
import { useEffect, useState } from "react";
import { getOrderHistory } from "../hooks/getOrder";
import OrderModel from "./modals/OrderModal";
import getProductInCart from "../hooks/getProductInCart";
import useOrderModal from "../hooks/useOrderModal";
 

const HistoryOrder: React.FC = () => {    

    const [orders, setOrders] = useState<any | null>(null); 
    const [loading, setLoading] = useState<boolean>(false);

    const orderModal = useOrderModal();
    const handleWatchDetail = (cartId: string) => {  
        if(cartId){
            setLoading(true);
            getProductInCart(cartId)
                .then(data => data && orderModal.setData(data.products, data.totalPrice))
                .catch(error => orderModal.setData(null , 0))
                .finally(() => {
                    setLoading(false); 
                    orderModal.onOpen();
                })
        }
    }
    useEffect(()=>{
        getOrderHistory()
            .then(data => setOrders(data))
            .catch(error => setOrders(null))
    },[]);
    return  ( 
        <>  
        <table className="w-full mt-10">
            <thead>
            </thead> 
            <tbody>
                <tr>
                    <th>Day purchase</th> 
                    <th>Totol Price</th>
                    <th>Payment</th>
                    <th>IsDelivered</th>
                </tr>
                {
                    orders
                        ?orders.map((order: any) => (
                            <tr key={order._id} className="border-b-2"> 
                                <td className="pt-6 pl-10 m-2">{moment(order.dateOfPurchase).format(' hh:mm:ss DD/MM/YYYY')}</td>
                                <td className="pt-6 pl-10 m-2">{order.pricePurchase}$</td>
                                <td className="pt-6 pl-10 m-2">{order.payment}</td>
                                <td className="pt-6 pl-10 m-2 flex justify-center items-center gap-3">
                                    {
                                        order.isDelivered 
                                            ? <ButtonStatic className="bg-green-600 text-white">Done</ButtonStatic>
                                            : <ButtonStatic className="bg-red-400 text-gray-50">Wait...</ButtonStatic> 
                                    }
                                    <ButtonStatic disable={loading} handleSubmit={()=>handleWatchDetail(order.cart)}   >
                                        Watch detail
                                    </ButtonStatic> 
                                </td>
                            </tr>
                        ))
                    : null
                } 
            </tbody>
        </table> 
        </>
    )
}

export default HistoryOrder;