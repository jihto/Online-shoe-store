
interface UserDto{
    _id: string;
    name: string;
}

export interface CommentDto{
    _id: string;
    content: string;
    product: string;
    picture: string;
    timeStamp: string;
    user: UserDto;
    __v: number;
}