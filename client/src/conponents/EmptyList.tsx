import { IconType } from "react-icons"; 

interface EmptyListProps{
    children: string | React.ReactNode;
    icon: IconType;
}

const EmptyList:React.FC<EmptyListProps> = ({
    children,
    icon: Icon,
}) => {
    return ( 
        <div className="mt-20 text-gray-400 grid justify-center items-center absolute top-1/2 right-1/2">
            <Icon size={86}/>  
            <div>{children}</div>
        </div>  
    )
}

export default EmptyList;