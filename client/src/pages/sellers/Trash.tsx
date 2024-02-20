import { useEffect, useState } from "react";
import { deleteProduct, getProductDeleted, restoreProduct } from "../../hooks/sellerAPI/getProductsSeller";
import Product from "../../conponents/product/Product";
import ButtonStatic from "../../conponents/buttons/ButtonStatic";
import { MdOutlineEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import AdminContainer from '../../conponents/containers/SellerContainer'; 
import { toast } from "react-toastify";

 

  
interface TrashProps{

}

const Trash:React.FC<TrashProps> = () =>{ 
    const [products, setProducts] = useState<any[] | null>(null);
    useEffect(()=>{ 
        getProductDeleted()
            .then(data => setProducts(data))
            .catch(err =>  setProducts(null));
    },[]);  
    const handleRestoreProduct = async(_id: string) => {
        try {  
            const response = await restoreProduct(_id); 
            toast.success("Delete Successfull");
            if(products)
                setProducts(products.filter(item => item._id !== _id)) 
        } catch (error: any) {
            toast.error(error.message)
        }  
    } 
    return(  
        <AdminContainer>
            <p className="text-xl font-medium m-5">Product have Deleted:</p>
            <div className=" rounded-b-xl grid grid-cols-5 gap-5 pb-5 px-4">
                {products 
                    ? products.map((item: any, index: number) =>  
                        <Product
                            key={index}
                            data={item}
                            role="admin"
                            secondAction={ 
                                <div className="grid grid-cols-2 justify-center  w-full">
                                    <ButtonStatic
                                        className="bg-[#465BA6] flex-row-reverse px-4 py-2 rounded-md text-white" 
                                        handleSubmit={() => handleRestoreProduct(item._id)} 
                                    
                                    >Restore</ButtonStatic>
                                    <ButtonStatic
                                        className="bg-red-600 px-4 py-2 rounded-md text-white" 
                                        handleSubmit={() => {}}  
                                    >Delete</ButtonStatic>
                                </div> 
                            } 
                        />)
                    : null
                }
            </div>
    </AdminContainer>
    )

}

export default Trash;