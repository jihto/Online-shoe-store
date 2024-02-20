import { IconType } from 'react-icons';


interface ButtonIconProps{
    onClick: (e: React.MouseEvent<HTMLButtonElement>,) => void;
    icon?: IconType;
    label?: string;
    sizeIcon?: 'large' | 'medium' | 'small';
    children?: React.ReactNode;
    className?:string;
    outline?: boolean;
}
const ButtonIcon: React.FunctionComponent<ButtonIconProps> = ({
    onClick,
    icon: Icon,
    label,
    sizeIcon = 'medium',
    children,
    outline = false,
    className = "",
}) => {
    return (
        <button 
            className={`
                ${outline ? "border-black border-b-[1px]" : ""}
                items-center relative font-normal mx-4 my-2 flex
                ${Icon && !label ? "rounded-full text-base" : ""}
                ${className ? className :"bg-white"} 
            `} 
            onClick={onClick}
        >
            {children}
            <p className='font-medium'>{label}</p>
            {Icon ? <Icon size={sizeIcon === 'large' ? 56 : sizeIcon === "medium" ? 32 : 24}/> : null}
        </button>
    )
}

export default ButtonIcon;