import { IsNotEmpty, IsString } from "class-validator"; 

export class CreateCommentDto{ 
    @IsNotEmpty()
    @IsString()
    content: string;   

    constructor(partial: Partial<CreateCommentDto>){ 
        Object.assign(this, partial);
    }
}
