import ButtonIcon from "../buttons/ButtonIcon";  
import { useState, useEffect } from 'react'; 
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { useShoppingContext } from "../../Context/ShoppingContext";
import {getProducts} from "../../hooks/getProducts";

const listCategoris = ["All", "Most purchased", "Basketball", "Running", "Football"];


const Catecories: React.FunctionComponent = ({  
}) => {  
    const [sort, setSort] = useState<Sort>('asc');
    const { dispatch } = useShoppingContext();
    const [currentCategory, setCurrentCategory] = useState<number>(0); 
    
    const handleSort = () => setSort(sort === 'asc' ? 'desc' : 'asc');

    useEffect(()=>{ 
        dispatch({ type: 'SET_SEARCH_QUERY', payload: "text" }); 
        getProducts('', sort)
            .then(data => dispatch({ type: 'SET_SEARCH_RESULTS', payload: data }))
            .catch(err => console.log(err));
    },[sort]);
    return ( 
        <div className="relative z-0 w-full py-2 px-4 border-spacing-1 grid justify-between grid-flow-col gap-3">
            {listCategoris.map((item:string, index: number) => (
                <ButtonIcon 
                    key={index}  
                    outline={index === currentCategory}   
                    onClick={() => {
                        setCurrentCategory(index)
                        handleSort()
                    }} 
                    label={item} 
                />
            ))}
            <hr/>
            <ButtonIcon 
                icon={sort === 'asc' ? GoSortDesc : GoSortAsc } 
                label="Sort"  
                sizeIcon="small"
                onClick={handleSort}
            /> 
        </div>
    )
}

export default Catecories;