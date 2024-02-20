import Container from "../../conponents/containers/Container"
import Catecories from "../../conponents/categories/Categories";
import Products from "../../conponents/product/Products";  
import SearchProduct from "../../conponents/inputs/SearchProduct";
import { ShoppingProvider } from "../../Context/ShoppingContext"; 

interface ShoppingProps{ 
}

const Shopping: React.FC<ShoppingProps> = ({ 
}) => {    
    return (
        <ShoppingProvider>
            <Container>
                <div className="grid gap-2">  
                    <div className="grid grid-cols-2 justify-center z-10 mt-5">
                        <p className="text-3xl font-medium">Products</p>              
                        <SearchProduct />
                        <Catecories /> 
                    </div>
                    <Products />
                </div>
            </Container>
        </ShoppingProvider>
    )
}

export default Shopping;