import React from 'react'

interface SellerContainerProps{
    children: React.ReactNode;
    p_page?: boolean;
}

const SellerContainer: React.FC<SellerContainerProps> = ({ children }) => {
  return (
    <div className={`
        max-w-[2520px] 
        mb-auto
        ml-[12%]
        w-[88%] 
        p-1
        overflow-hidden
    `}>
        {children}
    </div>
  )
}

export default SellerContainer