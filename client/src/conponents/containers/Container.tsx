import React from 'react'

interface ContainerProps{
    children: React.ReactNode;
    p_page?: boolean;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  p_page = true ,
  className="",
}) => {
  return (
    <div className={`
        max-w-[2520px] 
        ${p_page && 'pt-28 lg:pt-32'}
        mb-auto
        xl:px-20
        lg:px-16
        md:px-10 
        sm:px-5 
        px-0
        py-3
        ${className}
    `}>
        {children}
    </div>
  )
}

export default Container