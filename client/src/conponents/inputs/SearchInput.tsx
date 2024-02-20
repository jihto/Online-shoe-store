import { useState } from "react";
import { IconType } from "react-icons"; 
import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io"; 


interface SearchInputProps {
    value: string; 
    icon?: IconType;
    handleChange: (event?:React.ChangeEvent<HTMLInputElement>)=>void;
    labelName: string; 
    handleSubmit: (imageData: File | null)=> void;
    locaionDisplayImage?: "top" | "bottoms";
    disabled?: boolean;
    children?: React.ReactNode;
}

const SearchInput: React.FunctionComponent<SearchInputProps> = ({
    value, 
    icon: Icon,
    handleChange,
    labelName,
    handleSubmit,
    locaionDisplayImage = "bottom",
    disabled = false,
    children,
}) => { 
    const [imageData, setImageData] = useState<File | null>(null); 
    const [imageUrl, setImageUrl] = useState('');
   //display image upload in UI
    const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {  
            setImageData(file);
            const imagePreviewUrl = URL.createObjectURL(file);
            setImageUrl(imagePreviewUrl); 
        }
    };  

    const handleSubmitSearch = () => {
        handleSubmit(imageData);
        setImageData(null);
        setImageUrl('');
    }

    const handleClear = () =>{
        handleChange();
        setImageData(null); 
        setImageUrl('');
    }

    return (
        <div className="relative gap-1 w-full flex justify-center items-center text-gray-500 font-bold drop-shadow-lg ">
            <div className="relative w-full">
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange} 
                    className="peer border border-gray-300 bg-gray-50  ps-3 py-5 h-10 w-full outline-none hover:hover:bg-opacity-80 pointer rounded-full align-middle focus:ring-[#6469ff] focus:border-[#6469ff] block"
                /> 
                <p className={`absolute top-[20%] ${Icon ? 'left-5' : 'left-4'} text-gray-500 peer-focus:-top-1/2 peer-focus:left-6 peer-focus:text-black transition-[500ms]`}>
                    { value ? "" : labelName }
                </p>   
                {
                    value || imageData
                        ? <button onClick={handleClear} className="absolute right-12 top-2">
                            <IoMdClose size={24}/>
                        </button>
                        : null
                }
                <label className="absolute right-3 top-1" htmlFor="searchImage"><CiImageOn size={32}/></label>
            </div>
            <div className="flex w-fit justify-center align-middle border-2 h-fit rounded-full p-2 shadow-sm items-center gap-2"> 
                <input type="file" id="searchImage" onChange={onChangePicture} className="hidden"/> 
                {imageUrl && <img src={imageUrl} alt="Preview" className={`absolute bg-gray-50 shadow-md ${locaionDisplayImage === "bottom" ? "top-full" : "bottom-full"} rounded-lg mt-2 right-0 w-full lg:w-1/3`} />} 
                <button className={`${disabled ? 'opacity-40' : 'opacity-100'}`} disabled={disabled} onClick={handleSubmitSearch} >
                    {Icon && <Icon size={24}/> }
                </button>
            </div>
        </div>
    )
}


export default SearchInput;