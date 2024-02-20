import { create } from "zustand";
import { ProductCartProps } from "../types/ProductCart.interface"; 

interface OrderModelStore{
    dataProduct: ProductCartProps[] | ProductCartProps | null;
    totalPriceAllProduct: number;
    isOpen: boolean;
    setData: (dataProduct: ProductCartProps[] | ProductCartProps | null, totalPriceAllProduct: number) => void;
    onOpen: ()=>  void;
    onClose: () => void;
}

const useOrderModal = create<OrderModelStore>((set) => ({
    dataProduct: null,
    totalPriceAllProduct: 0,
    isOpen: false,
    setData: (dataProduct: ProductCartProps[] | ProductCartProps | null , totalPriceAllProduct: number )=> 
        set((state: OrderModelStore)=> ({
            dataProduct,
            totalPriceAllProduct
        })),
    onOpen: () =>set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useOrderModal;