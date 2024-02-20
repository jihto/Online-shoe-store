import { CiTrash } from "react-icons/ci"; 
import ButtonIcon from "../buttons/ButtonIcon";
import Product from "./Product"; 
import { MdOutlineEdit } from "react-icons/md";
import useConfirmModal from "../../hooks/useConfirmModal";
import { toast } from "react-toastify"; 
import { useEffect, useState } from "react";
import { deleteProduct, getProductsSeller } from "../../hooks/sellerAPI/getProductsSeller";
import ConfirmModel from "../modals/ConfirmModal";
import ButtonStatic from "../buttons/ButtonStatic";
import { useNavigate } from "react-router-dom";

const SellerProduct: React.FunctionComponent = () => {    
    const confirmModal = useConfirmModal();
    const [products, setProducts] = useState<any[] | null>(null);
    const navigate = useNavigate(); 

    const handleRemoveProduct = async() => {
        try { 
            if(confirmModal._id){
                const response = await deleteProduct(confirmModal._id); 
                toast.success("Delete Successfull");
                if(products)
                    setProducts(products.filter(item => item._id !== confirmModal._id))
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally{
            confirmModal.onClose();
        }
    } 

    useEffect(()=>{ 
        getProductsSeller()
            .then(data => setProducts(data))
            .catch(err =>  setProducts(null));
    },[]);
    return (
        <div className=' rounded-b-xl grid grid-cols-5 gap-5 pb-5 px-4 overflow-y-scroll h-[750px]'>
        {
            products 
                ? products.map((item: any, index: number) =>  
                    <Product
                        key={index}
                        data={item}
                        role="admin"
                        secondAction={ 
                            <div className="grid grid-cols-2 justify-center w-full">
                                <ButtonStatic
                                    className="bg-[#465BA6] flex-row-reverse px-4 py-2 rounded-md text-white"
                                    handleSubmit={() => navigate(`/admin/product/detail/${item._id}`, { state: item })}
                                >Edit<MdOutlineEdit size={24}/></ButtonStatic>
                                <ButtonStatic
                                    className="bg-red-600 px-4 py-2 rounded-md text-white"
                                    handleSubmit={() => confirmModal.onOpen("Do you want delete this product?", item._id)}
                                >
                                    Delete <CiTrash size={24}/>
                                </ButtonStatic>
                            </div> 
                        } 
                    />)
                : null
        }
        {
            confirmModal.isOpen 
                ? <ConfirmModel handleConfirm={handleRemoveProduct}/>
                : null 
        }
        </div> 
    )
}

export default SellerProduct;