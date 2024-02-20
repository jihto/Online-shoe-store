 
import { useEffect, useState } from "react";
import Box from "../../conponents/Box";
import Button from "../../conponents/buttons/Button";
import BarChart from "../../conponents/charts/BarChart";
import LineChart from "../../conponents/charts/LineChart";
import PieChart from "../../conponents/charts/PieChart";
import SellerContainer from "../../conponents/containers/SellerContainer";
import { getStatistic } from "../../hooks/sellerAPI/getProductsSeller";

const listSaller = [
    { title: "Sold", value: 10 },
    { title: "Pending", value: 25 },
    { title: "Return", value: 12 },
    { title: "Picked", value: 90 },
]

interface SummariesProps{

} 
const Summaries:React.FC<SummariesProps> = () =>{ 
    const [data, setData] = useState<any | null>(null); 
    console.log(data)
    useEffect(() => {
        getStatistic()
            .then(result => setData(result))
            .catch(error => console.log(error))
    }, []);
    return( 
        <SellerContainer>
            {
                data ? (
                    <div className="grid grid-row-3 h-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full border-b-[1px]"> 
                            <div className="border-r-[1px] py-4 px-8">
                                <p className="p-4 pt-0 text-lg font-medium">Weekly Sales</p>
                                <div className="grid grid-cols-[40%,60%] justify-between">
                                    <div className="text-gray-500">
                                        <p>Mon 01 - Sat 06</p> 
                                        <p>Number have sale: {data.soldProductsCount}</p>
                                    </div> 
                                    <div>
                                        <BarChart data={data.month}/>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4 px-8">
                                <p className="p-4 pt-0 text-lg font-medium">Store Overview</p>
                                <div className="text-gray-500 grid gap-2">
                                    <p>Total products: {data.totalProduct}</p>
                                    <p>Restore: 1</p>
                                    <p>Delete: {data.deletedProductsCount}</p>
                                    <div className="flex gap-5">
                                        <Button outline={true}>Create new product</Button>
                                        <Button outline={true}>Watching</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            
                                <div className="flex p-4 gap-8">
                                    <Box className="bg-[#5046a5] grid justify-start">
                                        <p className="text-xl">Today Order:</p>
                                        <p className="text-yellow-500">Mon 28th Now 2023</p>
                                        <p className="text-3xl">$140.00</p>
                                        <div className="flex gap-10 border-t-[1px] pt-4 px-4">
                                            { listSaller.map((item, index) => 
                                                <div key={index}>
                                                    <p className="text-gray-400">{item.title}</p>
                                                    <p>{item.value}</p>
                                                </div>
                                            ) }
                                        </div>
                                    </Box> 
                                    <div className="w-[48%]">
                                        <PieChart/>
                                    </div> 
                                </div>
                            
                            <LineChart/>
                        </div>
                            {/* <Box className="bg-[#29d7f0] flex gap-8 justify-start items-start">
                                <p className="text-black text-xl">New Return:</p>
                                <div className="flex gap-20 p-6 text-black border-t-[1px]">
                                    <div>
                                        <p  className="text-gray-500">Return: </p>
                                        <p className="text-3xl font-bold">102</p>
                                        <p>+1%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">New: </p>
                                        <p className="text-3xl font-bold">102</p>
                                        <p>+2%</p>
                                    </div>
                                </div>
                            </Box> */}
                        </div> 
                )
                :null
            }
        </SellerContainer>
    )

}

export default Summaries;