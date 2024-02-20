import React from 'react'
import { CiInboxOut } from 'react-icons/ci'; 

interface UploadInputProps{
    onChange: (e: any) => void;
}

const UploadInput:React.FC<UploadInputProps> = ({
    onChange, 
}) => {
    return ( 
        <label 
            htmlFor='file' 
            className='
                cursor-pointer
                w-fit
                bg-default
                shadow-md
                hover:opacity-40
                hover:shadow-lg
                py-1
                px-2
                rounded-full
                flex
                justify-center
                gap-5
                text-lg
                items-center
                relative
                bg-gray-700
                text-white
                border-black-2
            '
        >
            Choose File
            <div className='font-medium bg-gray-400 text-white p-2 rounded-full'>
                <CiInboxOut size={24}/>
            </div> 
            <input
                multiple
                id='file'
                className='hidden' 
                type='file'
                onChange={onChange}
            />
        </label> 
    )
}

export default UploadInput