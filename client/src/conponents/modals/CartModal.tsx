import Modal from "./Modal"; 

interface CartModalProps {
    open: boolean;
    setOpen:  (open: boolean) => void ;
}

const CartModal:React.FC<CartModalProps> = ({open, setOpen}) => { 
    return ( 
        <Modal 
            isOpen={open} 
            className="w-2/3 h-fit" 
            showIn="left" 
            content={<ContentCart/>}
        /> 
    )
}

const ContentCart = () =>{
    return (
        <div>
            <p className="text-2xl font-bold mb-10">Cart items</p>
            {
                [1,2,3].map(item => (
                    <>
                        <div key={item} className="grid p-4 grid-cols-4 justify-center items-center text-center text-gray-500 font-bold">
                            <img className="max-h-[100px]" src="public/images/t-shirt.png"/>
                            <p>Name Product</p>
                            <p>x2</p>
                            <p>10.2$</p>
                        </div>
                        <hr/> 
                    </>
                ))
            }
            <div className="">
                
            </div>
        </div>
    )
}

export default CartModal;