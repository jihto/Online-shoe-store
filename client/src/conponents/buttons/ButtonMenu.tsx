import { IconType } from 'react-icons'; 
interface ButtonMenuProps{
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: IconType;
    label?: string; 
    className?: string;
    active?: boolean;
}
const ButtonMenu: React.FunctionComponent<ButtonMenuProps> = ({
    onClick,
    icon: Icon,
    label, 
    className,
    active,
}) => {
    return (
        <button  
            className={`flex lg:gap-3 justify-items-start  hover:bg-[#465BA6]  hover:text-gray-100 rounded-xl px-2 py-1 items-center w-fit lg:w-full ${className} ${active ? "bg-[#465BA6] text-white" :""}`}
            onClick={onClick}
        >
            {Icon && <Icon size={32}/> }
            <p className='font-medium hidden lg:block'>{label}</p>
        </button>
    )
}

export default ButtonMenu;