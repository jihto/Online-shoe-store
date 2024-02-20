import { ReactNode } from "react";

interface HeadingProps{
    children?: ReactNode;
    header: string;
    className?: string;
}

const Heading:React.FC<HeadingProps> = ({
    children,
    header,
    className = "",
}) => {
    return (
        <div className={`${className} grid gap-5 `}>
            <p className="text-xl font-medium">{header}</p>
            <p className="leading-6 text-gray-600">{children}</p>
        </div>
    )
}

export default Heading;