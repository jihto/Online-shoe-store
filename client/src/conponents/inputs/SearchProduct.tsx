import { GoSearch } from "react-icons/go";
import SearchInput from "./SearchInput";
import { useEffect, useState } from 'react'; 
import api from "../../hooks/api";
import { useShoppingContext } from "../../Context/ShoppingContext";
import {getProducts} from "../../hooks/getProducts";

const SearchProduct:React.FC = ({  
}) =>{ 
    const [search,setSearch ] = useState<string>('');
    
    const { dispatch } = useShoppingContext();

    const handleChange = (event?:React.ChangeEvent<HTMLInputElement>)=>setSearch(event ? event.target.value.toLocaleLowerCase() : ''); 

    const handleSubmit = async(imageData: File | null) =>{ 
        
        if(imageData){  
            dispatch({ type: 'SET_SEARCH_QUERY', payload: "image" }); 
            // Append the Blob object to the FormData
            const formData = new FormData();
            formData.append('picture', imageData); 
            try {
                const response = await api.post('product/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });  
                dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data }); 
            } catch (error) {
                console.log(error);
            } finally{
                setSearch('');
            }
        }
    } 
    useEffect(()=>{ 
        dispatch({ type: 'SET_SEARCH_QUERY', payload: "text" }); 
        getProducts(search)
            .then(data => dispatch({ type: 'SET_SEARCH_RESULTS', payload: data }))
            .catch(err => console.log(err));
    },[search]);
    return ( 
        <SearchInput 
            labelName="Search..."
            handleChange={handleChange}
            value={search}
            icon={GoSearch}
            handleSubmit={handleSubmit}
        />  
    )
}


export default SearchProduct;