import Container from "../../conponents/containers/Container";
import Outstanding from "../../conponents/Outstanding";
import ButtonIcon from "../../conponents/buttons/ButtonIcon"; 
import { MdNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';  
import { BiDownArrowAlt } from 'react-icons/bi' 
import React,{ useEffect, useRef, useState } from 'react' 

import Button from "../../conponents/buttons/Button";
import Box from "../../conponents/Box"; 
import { useNavigate } from "react-router-dom";
import Footer from "../../conponents/Footer";
import Brand from "../../conponents/Brand"; 
import { getProducts } from "../../hooks/getProducts";
import { ProductProps } from "../../types/Product.interface";
import UserProduct from "../../conponents/product/UserProduct";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => { 
    const scrollRef = useRef<HTMLDivElement>(null); 
    const navigate = useNavigate();
    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 500;
        }
    };
    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 500;
        }
    };  
    // const countDownTime = useCountDown(2); 
    const [products, setProducts] = useState<ProductProps[] | []>(); 
    useEffect(()=>{
        getProducts()
            .then(data => setProducts(data))
            .catch(err => setProducts([]));    
    }, []);
    return ( 
    <>     
        <Container>   
            <div className="w-full  grid lg:gap-4 snap-start">
                <Outstanding header=" Air Jordan 6GX eastside" content="Feel unbeatable from the tee box to the final putt in a design that's pure early MJ.speed class"/>
            </div>

            <div className="bg-gray-100 w-full rounded-xl my-5 p-4 mb-32 ">
                <div className="flex justify-between">
                    <p className="text-xl font-bold ">
                        Today Best Deals!
                    </p>
                    <p className="bg-orange-600 py-1 px-3 rounded-full text-white">
                        End in: 
                    </p>
                </div>
                <div className="relative"> 
                    <div className="overflow-x-hidden overflow-auto touch-pan-x hover:scroll-m-0 flex scroll-smooth"  ref={scrollRef}>
                        {
                            products && products.map((item: ProductProps, index: number) => ( 
                                <UserProduct data={item} key={index}/>  
                            ))
                        }
                    </div>
                    <div className="absolute top-1/3 right-0 lg:-right-9 drop-shadow-x">
                        <ButtonIcon icon={MdNavigateNext} onClick={handleScrollRight}/>
                    </div>
                    <div className="absolute top-1/3 left-0 lg:-left-9 drop-shadow-xl">
                        <ButtonIcon icon={MdOutlineNavigateBefore} onClick={handleScrollLeft}/>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mb-32 gap-10 justify-center items-center text-center snap-start">
                <p className="text-5xl">Shop Now, Goodlook Later!!</p>
                <p className="text-xl text-gray-500">We have a bunch collection for you!, let's go expolore and find your dream shoes, make it happen.</p> 
                <div className="md:flex justify-center items-center">
                    {
                        products && products.map((item: ProductProps, index: number) => ( 
                            <div key={index}>
                                {
                                    index < 3 
                                    ? <UserProduct data={item}/>  
                                    : null
                                }
                            </div>
                        ))
                    }
                </div>
                <Button onClick={()=>navigate("/user/shopping")}><BiDownArrowAlt size={24} className="animate-bounce"/> Show More </Button>
            </div> 
            <div className="flex flex-col mb-32 gap-10 justify-center items-center text-center">
                <p className="text-5xl capitalize">The offical store of the amazing brand</p>
                <p className="text-xl text-gray-500">We work together with high quality nd famous brand around the world</p>
                <div className="grid grid-cols-3 gap-1 lg:gap-5 w-full">
                        <Brand label="Nike" name="nike"/>
                        <Brand label="Adidas" name="adidas"/>
                        <Brand label="New balance" name="nike"/>
                </div>
                <Button><BiDownArrowAlt size={24} className="animate-bounce"/> Show More </Button>
            </div> 
            <Box className="relative text-center overflow-hidden md:py-12 xl:py-28">
                <img className="absolute animate-wiggle -top-1/2 opacity-30 h-fit z-0 " src="public/images/sneaker.png"/>
                <p className="font-bold w-full md:w-1/2 lg:w-1/3 text-5xl ">Bringing you to update fanstastic footwear</p>
                <p className="w-full md:w-1/2 lg:w-1/3 my-5">View all brands of out collection on Footewear, there is another collection. Please check it out bro, seriously!</p>
                <Button >More about us </Button>
            </Box> 
        </Container>  
        <Footer/>
        </>
    )
}

export default Home;