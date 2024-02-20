import { CiShoppingCart } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import ButtonStatic from "../buttons/ButtonStatic"; 
import Product from "./Product";
import { ProductProps } from "../../types/Product.interface";
import { useState } from "react";
import { favoriteProduct, unFavoriteProduct } from "../../hooks/getProducts";
import { addProductToCart } from "../../hooks/getProductInCart";
import { toast } from "react-toastify"; 


interface UserProductProps {
    data: ProductProps;
}


const UserProduct: React.FC<UserProductProps> = ({
    data
}) => {
    const [stateAddCart, setStateAddCart] = useState<boolean>(false);
    const dataUser = localStorage.getItem("user");

    const [like, setLike] = useState<boolean>(() => {
        if (dataUser) {
            const products = JSON.parse(dataUser).favoriteProduct
            return products.some((item: string) => item === data._id)
        }
        return false;
    });  
    const handleFavorite = async (productId: string) => {
        try {
            if (!like)
                await favoriteProduct(productId);
            else
                await unFavoriteProduct(productId);
        } catch (error) {
            console.log(error);
        }
        setLike(!like);
    } 

    const handleAddCart = async (_id: string, productName: string) => {
        try {
            setStateAddCart(true);
            const result = await addProductToCart(_id);
            if (result.response && dataUser) {
                localStorage.setItem("user", JSON.stringify({ ...JSON.parse(dataUser), cart: result.response }));
            } 
            toast.success(`Add ${productName} to cart successfull`, { position: toast.POSITION.BOTTOM_RIGHT, })
        } catch (error) {
            console.log(error)
        } finally {
            setStateAddCart(false);
        }
    }
    return (
        <Product
            data={data} 
            secondAction ={  
                <div className="grid grid-cols-[80%,20%]">
                    < ButtonStatic    
                        disable={stateAddCart}
                        className='bg-gray-500 text-white hover:bg-gray-800'
                        handleSubmit={() => handleAddCart(data._id, data.name)}
                    >
                        <p>{stateAddCart ? "Waiting..." : "Add cart"}</p>
                        <CiShoppingCart size={24} />
                    </ButtonStatic > 
                    < ButtonStatic     
                        className={`bg-gray-500 ${like ? "text-red-500" : " text-white"}`}
                        handleSubmit={() => handleFavorite(data._id)}
                    > 
                        <IoHeart size={24} />
                    </ButtonStatic > 
                </div>
            }
        />
    )
}


export default UserProduct;