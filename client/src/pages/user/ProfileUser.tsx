import Heading from "../../conponents/Heading";
import ButtonIcon from "../../conponents/buttons/ButtonIcon";
import Container from "../../conponents/containers/Container";
import { useEffect, useState } from 'react';
import FormField from "../../conponents/inputs/FormField";
import Button from "../../conponents/buttons/Button";
import { CiDeliveryTruck, CiLogout, CiPhone, CiUndo, CiUser } from "react-icons/ci";
import { IconType } from "react-icons"; 
import HistoryOrder from "../../conponents/HistoryOrder";
import Order from "../../conponents/Order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import { getFavoriteProduct } from "../../hooks/getProfileUser";
import UserProduct from "../../conponents/product/UserProduct";

interface ProfileUserProps{

}

interface ListsProfileProps {
    name: string,
    icon: IconType;
    content:React.ReactNode
}
const Information: React.FC =() =>{
    const user = localStorage.getItem("user");
    const [dataUser, setDataUser] = useState<any | null>(null);
    const [products, setProducts] = useState<any[] | []>([]);
    useEffect(()=>{
        if(user) {
            setDataUser(JSON.parse(user));
        }
        getFavoriteProduct()
            .then(result => setProducts(result))
            .catch(error => console.log(error));
    },[]);
    return (
        <> 
            {
                dataUser &&
                <div className="grid grid-cols-[30%,70%] gap-3 items-start ">
                    <div>
                        <p className="font-medium text-xl my-5">Information basic of user:</p>
                        <div className="py-6 px-4 w-full justify-center justify-items-center shadow-sm rounded-3xl border-2">
                            <div className="flex flex-col gap-2 ">
                                <FormField 
                                    labelName="Name"
                                    name="name"
                                    placeholder="User name ..."
                                    value={dataUser.name}
                                    handleChange={()=>{}}
                                />
                                <FormField 
                                    labelName="Email"
                                    name="email"
                                    placeholder="Email name ..."
                                    value={dataUser.email}
                                    handleChange={()=>{}}
                                />  
                                <FormField 
                                    labelName="Location"
                                    name="address"
                                    placeholder="Location..."
                                    value={dataUser.address}
                                    handleChange={()=>{}}
                                /> 
                                <Button>Update</Button>
                            </div> 
                            
                        </div>
                        {/* <CiPhone size={32}/>
                        <p className="font-medium my-4">Need help?</p>
                        <p>If you have any query please<br/> contact us</p>
                        <Button>Contact Us</Button> */}
                        
                    </div>
                    <div className="h-[630px] ">
                        <p className="font-medium text-xl my-5">Favorites products:</p>
                        <div className="rounded-3xl grid grid-cols-2 h-full justify-center items-start p-1">
                            {
                                products 
                                    ? products.map((item: any , index: number) => (
                                        <UserProduct data={item} key={index} />
                                    ))
                                    : null
                            }
                        </div>
                    </div> 
                </div>
            }
        </>
    )
}
 
const listsProfile:ListsProfileProps[] = [
    {
        name: "Information",
        icon: CiUser ,
        content: <Information/>
    },{
        name:"Order",
        icon: CiDeliveryTruck ,
        content: <Order/>
    },{
        name: "History",
        icon: CiUndo ,
        content:<HistoryOrder/>,
    },{
        name: "Log Out",
        icon: CiLogout ,
        content: "Logout",
    }
]

const ProfileUser:React.FC<ProfileUserProps> = () => {
    const navigate = useNavigate();
    const [currentContent, setCurrentContent] = useState<number>(0);
    const handleLogout = () =>{
        localStorage.removeItem("user");
        toast.success("Log out successfull")
        setTimeout(()=>{
            navigate('/user');
        }, 1000);
        
    }
    return (
        <Container> 
            <Heading className="mt-10" header="Profile User"></Heading>  
            <Container p_page={false}> 
                <div className="grid grid-cols-[20%,80%] gap-5"> 
                    <section className="max-h-[100px] grid gap-4 border-r-2">
                        {
                            listsProfile.map((item, index) => ( 
                                <ButtonIcon 
                                    className="hover:bg-gray-50"
                                    key={index}  
                                    icon={item.icon}
                                    sizeIcon="medium"
                                    outline={currentContent === index} 
                                    onClick={()=>index !== 3 ? setCurrentContent(index) :  handleLogout()} 
                                    label={item.name}
                                /> 
                                ))
                            } 
                    </section>
                    <section className="px-5">
                        {
                            listsProfile[currentContent].content
                        }
                    </section> 
                </div>
                </Container>
        </Container>
    )
}

export default ProfileUser;