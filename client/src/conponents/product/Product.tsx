import { memo } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { ProductProps } from '../../types/Product.interface';  
import 'react-toastify/dist/ReactToastify.css'; 
import { Role } from '../../types/Role';

export interface ProductComponentProps{ 
    data: ProductProps;
    role?:Role;
    action?: React.ReactNode;
    secondAction?: React.ReactNode;
}
const Product: React.FC<ProductComponentProps> = ({   
    data, 
    role = "user",
    action,
    secondAction, 
}) => { 
    const navigate = useNavigate();  
    return (
        <>
        {
            data 
                ? <div className={`relative rounded-2xl shadow-xl border-[1px] w-1/3 lg:w-fit bg-white grid gap-1 hover:bg-gray-50 hover:opacity-90 m-1 p-2 min-w-[280px]`}>
                    <div className={`absolute top-0 -right-2 cursor-pointe `}>
                        {action }
                    </div>
                    <img 
                        src={`http://localhost:3000/uploads/images/${data.picture}`} 
                        onClick={()=> navigate(`/${role}/product/detail/${data._id}`, { state: data })}
                        className="border-[1px] cursor-pointer w-[280px] h-[200px] object-contain bg-gray-200 rounded-xl mix-blend-multiply"
                    />
                    <p className="pt-2 font-medium">{data.name}</p>
                    <p className="font-medium text-base">{data.price}$</p>
                    <p className="text-gray-400 py-1 flex justify-start items-center"> 652 item sold out</p>
                    {secondAction} 
                </div>
                :null
        }
        </>
    )
}

export default memo(Product);