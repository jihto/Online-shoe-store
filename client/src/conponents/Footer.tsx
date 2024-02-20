import Box from "./Box";
import Container from "./containers/Container";
import Button from "./buttons/Button"; 
import FormField from "./inputs/FormField";

interface FooterProps {}

interface ListsProps{
    title: string;
    items: string[];
}

const lists: ListsProps[] = [
    {
        title: "Products",
        items: ["Shoes", "Apparel"]
    },{
        title: "Collections",
        items: ['Nike', 'Adidas', 'Vans',]
    },{
        title:"Legal",
        items:["Privacy Policy", 'Terms and Conditions']
    },{
        title:"Featured",
        items:["New Arrivals", 'Sale', "Start Selling"]
    },{
        title:"Support",
        items:["Contact us", 'Give feedback', "Help center"]
    }
]


const Footer: React.FC<FooterProps> = () =>{ 
    return (
        <div className="w-full bg-black text-primary py-4">
            <Container p_page={false}>
                <div className="flex gap-2 justify-between"> 
                    <div className="w-1/2 lg:w-1/3 grid">
                        <div className="font-bold lg:text-xl">
                            LOGO
                        </div>
                        <div className="text-gray-400 font-bold break-words">
                            Footwear was designed and founded in 2023 by person. The theme is about sneakers ecommerce that use for shoes selling around the word.
                        </div>
                        <Box >
                            <div className="flex justify-between">
                                <p className="lg:text-2xl break-words">Don't Wanna Miss Our Offers</p>
                                <p className="text-gray-400 break-words">Drop your email below , and start receiving the best offer from FoorWear</p>
                            </div>
                            <div className="lg:flex w-full flex gap-5"> 
                                <FormField  
                                    name="contact"
                                    placeholder="Youremail@mail.com"
                                    handleChange={()=>{}}
                                    value="" 
                                />
                                <Button > Subscribe</Button>
                            </div>
                        </Box>
                    </div>
                    <div className="grid grid-cols-3 text-gray-400 w-1/2 text-left items-start">
                        {
                            lists.map((item, index) => (
                                <div key={index} className="grid gap-4 mb-10">
                                    <p className="text-white font-bold lg:text-lg">{item.title}</p>
                                    {
                                        item.items.map((subItem, subIndex)=>(
                                            <p key={subIndex}>{subItem}</p>  
                                        ))
                                    }
                                </div>
                            ))
                        } 
                    </div> 
                </div>
            </Container>
        </div>
    )
}


export default Footer;