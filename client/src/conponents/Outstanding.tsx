import Box from "./Box";
import Button from "./buttons/Button"; 
import { BsArrowUpRight } from 'react-icons/bs';

interface OutstandingProps {
    size?: 'large' | "small";
    header: string;
    content: string | React.ReactNode;
}

const Outstanding:React.FunctionComponent<OutstandingProps> = ({
    size="large",
    header,
    content
}) => {
    return (
        <Box cols={size === "small" ? 1 : 2} className={`rounded-none lg:rounded-2xl relative justify-start mt-6 lg:m-0 px-5 py-24 lg:py-8 ${size === "small" ? "w-full lg:w-1/2 h-full text-black bg-[#c1f5fc]" : "text-white bg-[#bed7da]"}`}>
            <div className={`absolute -bottom-1 left-1/3 opacity-90 lg:relative animate-move-slow drop-shadow-2xl lg:w-full"`}>
                <img className={`flex-1 max-h-[400px] object-contain z-10 `} 
                    src={ size === "small" ? "/public/images/11908.png" : "/public/images/11908.png"} 
                />
            </div>
            <div className="z-10">
                {size === "large"
                    ?<p className="uppercase text-2xl">
                        New Arrival!
                    </p>
                    : null
                }
                <p className={`lg:text-5xl md:text-3xl sm:text-2xl uppercase my-5`}>
                    {header} 
                </p>
                <div className="my-8 z-10">
                    {content}
                </div> 
                <Button><BsArrowUpRight/>View Product</Button>
            </div>
        </Box>
    )
}

export default Outstanding;