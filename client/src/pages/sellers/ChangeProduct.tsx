import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminContainer from '../../conponents/containers/SellerContainer';
import Heading from "../../conponents/Heading"; 
import { useEffect, useState } from 'react'; 
import FormField from "../../conponents/inputs/FormField";
import ButtonStatic from "../../conponents/buttons/ButtonStatic";
import UploadInput from "../../conponents/inputs/UploadInput";
import { toast } from "react-toastify"; 
import { createProduct, updateProduct } from "../../hooks/sellerAPI/getProductsSeller";
import ButtonIcon from "../../conponents/buttons/ButtonIcon";
import { CiCircleRemove } from "react-icons/ci";
import ButtonMenu from "../../conponents/buttons/ButtonMenu";
interface ChangeProductProps{
}


export interface DataProductProps{
    price: string; 
    description: string;
    name: string;
    _id:string ;
    picture: string | File; 
    categories: string[],
    seller: string;
}
const ChangeProduct:React.FC<ChangeProductProps> = () =>{
    const params = useParams();  
    const seller = localStorage.getItem("seller");
    const navigate = useNavigate();
    const [dataProduct, setDataProduct] = useState<DataProductProps>({
        _id: '',
        name: '',
        description: '',
        price: '',
        picture: '',
        categories: [],
        seller: '',
    });
    console.log(dataProduct);
    const [listCategories, setListCategories] = useState<string[] | []>([]);
    const [show, setShow] = useState<boolean>(false);
    const [lists, setLists] = useState<string[] | []>(['sport', 'adidas', 'fashion']);

    const { state } = useLocation();   

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;
        const { name, value } = inputElement;
        setDataProduct({ ...dataProduct, [name]: value });
    };  
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setDataProduct({...dataProduct, picture: file});
        }
    }
;

    const handleSumitDataProduct = async() => { 
        try {
            if(dataProduct.name && dataProduct.description && dataProduct.price && dataProduct.picture){
                const formData = new FormData();
                formData.append("name",dataProduct.name);
                formData.append("description", dataProduct.description);
                formData.append("price", dataProduct.price);
                formData.append("picture", dataProduct.picture)
                formData.append("seller", dataProduct.seller);
                dataProduct.categories.forEach((category, index) => {
                    formData.append(`categories[${index}]`, category);
                }); 
                
                if(state && params.id){ 
                    //upadte product  
                    const response = await updateProduct(params.id, formData);
                    console.log(response); 
                    toast.success("update product successfull");
                }else{ 
                    //create product
                    const response = await createProduct(formData);
                    toast.success("create new product successfull");
                    setTimeout(() => {
                        navigate('/admin/home');
                    }, 2000); 
                } 
            }else{
                toast.error("U miss some fields");
            }
        } catch (error) { 
        } 
    }

    useEffect(()=>{
        if(seller){
            const dataSeller: string = JSON.parse(seller)._id;
            setDataProduct({...dataProduct, seller: dataSeller});
        }

        if(state){ 
            const { _id, picture, name, description, price, categories } = state; 
            setDataProduct({...dataProduct,_id, name, description, picture, price, categories: categories ? categories : []});
        } 
    }, []);
    return (
        <AdminContainer>
            <div className="rounded-md p-10"> 
                <Heading header="Deatails"></Heading> 
                <div className="lg:flex grid grid-cols-2 gap-5">
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 max-h-[400px] lg:max-h-[700px] flex flex-col gap-2 justify-center items-center">
                        { selectedImage ? (
                            <img
                                src={selectedImage } 
                                className="max-w-1/2 w-full h-5/6 bg-white object-contain"
                            />
                            ) : (
                            <img
                                src={state ? `http://localhost:3000/uploads/images/${dataProduct.picture}` : "/public/images/empty_avatar.png"}
                                alt="preview"
                                className="max-w-1/2 w-full h-5/6 object-contain"
                            />
                        )}  
                        <UploadInput onChange={handleInputImage} />
                    </div>
                    <div className="bg-gray-100 rounded-xl flex flex-col p-5 gap-5">
                        <Heading header={state ? "Update product": "Create product"}/>
                        <div className="flex items-center gap-5">
                            <FormField 
                                labelName="Name"
                                type="text"
                                name="name"
                                placeholder="Enter your name product..."
                                value={dataProduct.name}
                                handleChange={handleChange}
                            />  
                            <FormField 
                                labelName="Price" 
                                name="price"
                                type="number"
                                placeholder="Enter price product..."
                                value={dataProduct.price}
                                handleChange={handleChange}
                            /> 
                        </div>
                        <div className="relative">
                            <div className="flex justify-between">
                                <p className="font-medium">Categories:</p>
                                <button onClick={()=>setShow(!show)} className="border-2 border-white rounded-md  px-1">List</button>
                            </div>
                            <div className="grid grid-cols-2 p-1 gap-2 border-gray-300 bg-white border-2 rounded-md">
                                {dataProduct.categories && dataProduct.categories.map(item => 
                                    <ButtonMenu key={item} 
                                        onClick={()=> {
                                            setDataProduct({...dataProduct, categories:dataProduct.categories.filter(category => category !== item)});
                                            setLists([...lists, item])
                                        }} 
                                        label={item} icon={CiCircleRemove } 
                                        className="bg-gray-200 h-fit w-fit" 
                                    />)
                                }
                            </div> 
                            {
                                show
                                    ?<div className="absolute bg-white right-0 w-1/2 -bottom-[50px] gap-1 rounded-md py-4 px-2 shadow-md grid grid-cols-2">
                                        {lists.map(item => 
                                            <ButtonMenu key={item}
                                                onClick={()=>{
                                                    setLists(lists.filter(category => category !== item))
                                                    setDataProduct({...dataProduct,categories:[...dataProduct.categories, item]});
                                                }} 
                                                className="bg-gray-200 h-fit w-fit px-2 py-1 rounded-md" 
                                                label={item}
                                            />)
                                        }
                                    </div>
                                : null
                            }
                        </div>
                        <p className="font-medium">Description:</p>
                        <textarea 
                            rows={6}
                            placeholder="Input your description..."
                            value={dataProduct.description} 
                            className="w-full min-w-0 rounded-md overflow-visible bg-white border border-gray-300 p-2 focus:ring-[#6469ff] focus:border-[#6469ff] outline-none " 
                            onChange={e=>setDataProduct({...dataProduct, description: e.target.value})} 
                        >
                        </textarea> 
                        <div className="flex gap-5"> 
                            <ButtonStatic
                                handleSubmit={handleSumitDataProduct}
                                className="text-white bg-[#5046a5]" >{state ? 'Update...' : 'Create'} </ButtonStatic>
                            <ButtonStatic>Cancel</ButtonStatic>
                        </div> 
                    </div>
                </div> 
            </div>
        </AdminContainer>
    )
}


export default ChangeProduct;