
interface BrandProps{
    label:string;
    name: 'adidas' | 'nike' | 'newBalance'
}
type ListProps = {
    [key: string]: string[];
};
const Lists: ListProps = {
    'adidas': ['42829.jpg','39830.jpg','39848.jpg', '46575.jpg'], 
    'nike': ['49757.jpg','32374.jpg', '33210.jpg', '14130.jpg'],
    'newBalance':['15450.jpg'] 
}

const Brand:React.FC<BrandProps> = ({ label, name }) => {  
    return (
        <div className="border-[1px] shadow-md rounded-xl p-1 lg:p-4 grid gap-2">
            <div className="flex font-bold justify-start items-center gap-2">
                <img className="w-12 h-12 border-2 rounded-full object-cover mix-blend-color-burn" src={`public/images/${label}.jpg`} />
                <div>{label}</div>
            </div>
            <div className="grid grid-cols-2 gap-2"> 
            {Lists[name].map((item: string, index: number) => (
                <img
                    key={index}
                    className="bg-gray-200 object-contain w-full max-h-[200px] border-[1px] rounded-lg"
                    src={`public/images/${item}`}
                    alt={item}
                />
            ))} 
            </div>
        </div>
    )
}

export default Brand;