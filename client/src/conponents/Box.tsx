
interface BoxProps {
    children: React.ReactNode;
    cols?: 1 | 2;
    className?: string;
}

const Box:React.FC<BoxProps> = ({
    className = "",
    children,
    cols = 1
}) =>{
    return (
        <div className={`
            bg-[#282828] text-white py-2 px-5 rounded-2xl justify-center gap-5 items-center  
            ${cols === 1 ? " flex flex-col" : "grid lg:grid-cols-2"}
            ${className}    
        `}>
            {children}
        </div>
    )
}

export default Box;