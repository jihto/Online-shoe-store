import { HiOutlineEmojiSad } from "react-icons/hi";
import { useShoppingContext } from "../../Context/ShoppingContext";
import EmptyList from "../EmptyList"; 
import UserProduct from "./UserProduct";
 
const Products: React.FunctionComponent = () => {  
    const { state } = useShoppingContext(); 
    return (
        <div className="w-full rounded-xl flex-wrap flex lg:grid lg:grid-cols-4 xl:grid-cols-5"> 
            {
                state.searchResults.length !== 0 
                    ? state.searchResults.map((item, index) => (
                        <UserProduct 
                            data={item}
                            key={index} 
                        />  
                    ))
                    :<EmptyList icon={HiOutlineEmojiSad}>Have not product...</EmptyList>
            }   
            
        </div>
    )
}

export default Products;