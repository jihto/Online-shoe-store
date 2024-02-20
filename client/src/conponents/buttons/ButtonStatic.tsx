

interface ButtonStaticProps{
    className?:string;
    children: React.ReactNode | string;
    rounded?: boolean;
    handleSubmit?: () => void;
    disable?: boolean;
}
const ButtonStatic: React.FC<ButtonStaticProps> = ({ children, className, rounded = false, handleSubmit, disable = false }) =>{
    return(
        <button 
            onClick={handleSubmit}    
            className={`
                border-2 px-4 py-2 flex justify-center items-center gap-1 hover:opacity-75
                ${disable ? 'opacity-40' : 'opacity-100'}
                ${className ? className : 'bg-[#6e7b7c] text-gray-50'}
                ${rounded ? 'rounded-full' : 'rounded-md' }
            `}
        >
            {children}
        </button>
    )
}

export default ButtonStatic;