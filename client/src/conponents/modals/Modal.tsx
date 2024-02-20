import { MdClose } from "react-icons/md";
import ButtonIcon from "../buttons/ButtonIcon";


interface ModalProps{ 
    isOpen: boolean,
    showIn?: "center" | 'left';
    hanldeClose: () => void ;  
    content: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}
const Modal: React.FunctionComponent<ModalProps> = ({ 
    isOpen,
    showIn = "center",
    hanldeClose, 
    content, 
    className = "",
    action, 
}) => { 
    return (
        <div className={`
                fixed z-50 bg-black overflow-hidden w-full 
                transition-[1000ms] inset-0 focus:outline-none bg-neutral-800/70 flex 
                ${isOpen ?  "h-full" : "h-0"} 
                ${showIn === "left" ? "items-start justify-end":"items-center justify-center"} 
            `}>
            <div 
                className={` ${className}
                    relative bg-white p-4  grid rounded-xl h-fit
                    ${showIn === "left" && 'w-2/3 lg:w-2/5 xl:w-2/6 h-full rounded-l-xl'}
            `}>
                <div className="absolute top-4 right-4 drop-shadow-lg">
                    <ButtonIcon icon={MdClose} sizeIcon="medium" onClick={hanldeClose} />
                </div> 
                <div className="mt-4"> 
                    {content} 
                    {action} 
                </div>
            </div>
        </div>
    )
}


export default Modal;