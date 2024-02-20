
interface ButtonProps{
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;   
    children?: string | React.ReactNode; 
    color?: boolean;
    locationIcon?: "right" | "left";
    className?: string;
    size?: "large" | "small"; 
    outline?: boolean;
    type?: "button" | "submit";
}
const Button: React.FunctionComponent<ButtonProps> = ({
    onClick, 
    children,
    color= true,
    className="",
    size = "small", 
    locationIcon = "right",
    outline = false,
    type="button",
}) => {
    return (
        <button 
            className={`
                ${size === 'large' ? "px-6 py-3 " : "px-4 py-2"}  
                rounded-full 
                flex
                justify-center
                items-center gap-2
                ${className}  
                ${outline 
                    ? 'bg-white text-black border-gray-200 border-[1px] shadow-md hover:shadow-lg hover:bg-gray-100' 
                    : color 
                        ? `bg-gray-800 text-primary hover:bg-white hover:text-secondary` 
                        : ""
                } 
                ${locationIcon === "right" ? "flex-row-reverse" : "flex-row-[unset]"}
            `} 
            type={type}
            onClick={onClick}
        >
            {children} 
        </button>
    )
}

export default Button;