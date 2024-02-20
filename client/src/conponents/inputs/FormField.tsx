import React from 'react';

interface FormFieldProps{
    className?: string;
    labelName?: string;
    type?: "text" | "file" | "button" | 'password' | 'number' | 'email';
    name: string;
    placeholder: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isSurpriseMe?: boolean;
    handleSurpriseMe?: () => void;
}

const FormField:React.FC<FormFieldProps> = ({
    className = '',
    labelName,
    type = "text",
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
}) => (
    <>
        <div className="flex items-center gap-2 mb-2">
        <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-900"
        >
            {labelName}
        </label>
        {isSurpriseMe && (
            <button
                type="button"
                onClick={handleSurpriseMe}
                className="font-semibold text-xs bg-[#c9c9d6] hover:bg-gray-200 py-1 px-2 rounded-[5px] text-black"
            >
            Surprise me
            </button>
        )}
        </div>
        <input
            type={type}
            id={name}
            name={name}
            className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3`}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
        />
    </>
);

export default FormField;