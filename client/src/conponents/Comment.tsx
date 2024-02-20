import React, { useEffect, useState } from "react"
import { createComment, getComments } from "../hooks/getComments";
import { CommentDto } from "../types/Comment.interface";
import moment from "moment"; 
import { CiChat1, CiPaperplane } from "react-icons/ci";
import Heading from "./Heading"; 
import { toast } from "react-toastify";
import EmptyList from "./EmptyList";
import SearchInput from "./inputs/SearchInput";


interface CommentProps {
    productId: string;
}

export const Comment:React.FC<CommentProps> = ({productId}) => {
    const [comments, setComments] = useState<CommentDto[] | []>([]);
    const [sending, setSending] = useState<boolean>(false);
    const [data, setData] = useState<string>(""); 
 

    useEffect(() => {
        getComments(productId)
            .then(result => setComments(result))
            .catch(error => console.error(error))
    },[]);
    const handleChange = (event?:React.ChangeEvent<HTMLInputElement>)=>setData(event ? event.target.value : ''); 
    const handleSendComment = async (imageData: File | null) => {
        setSending(true);  
        try {
            if(data){
                const formData = new FormData();
                formData.append("content", data);
                if(imageData)
                    formData.append("picture", imageData);
                const newComment = await createComment(productId, formData); 
                if(newComment){
                    setComments([...comments, newComment]);
                    setData(""); 
                }
            } 
        } catch (error) {
            toast.error("Comment Fail!");
        } finally{ 
            setSending(false);
        }
    }
    return (
        <div className="grid items-center content-between h-full">
            <div className="grid grid-cols-2 h-[600px] max-h-[600px] gap-5 justify-center items-center overflow-x-hidden overflow-auto touch-pan-x">
                {
                    comments.length > 0
                        ? comments.map((item:CommentDto ,index: number) => (
                            <div className="grid gap-3" key={index}>
                                <div>
                                    <p className="font-medium"> {item.user.name}</p>
                                    <p>{moment(item.timeStamp).format(" kk:mm:ss YYYY/MM/DD")}</p>
                                </div>   
                                <div className="flex gap-5 bg-gray-100 w-2/3 p-4 rounded-xl justify-start ">
                                    { item.picture ? <img className="max-w-[150px]" src={`http://localhost:3000/uploads/images/${item.picture}`} /> : null}
                                    <p className="max-w-xs break-words">{item.content}</p>
                                </div>
                            </div>
                        ))
                        : <EmptyList icon={CiChat1}>Not review...</EmptyList>
                }
            </div>
            <hr/>
            <Heading className="pt-4" header="Write a review"/>
            <div className={`grid w-1/2 items-center ${sending ? "opacity-25" : "opacity-100"}`}>
                <SearchInput 
                    locaionDisplayImage="top"
                    icon={CiPaperplane}
                    value={data}
                    handleChange={handleChange}
                    labelName="Comment..."
                    handleSubmit={handleSendComment}
                    disabled={data ? false : true}
                /> 
            </div>
        </div>
    )
}

