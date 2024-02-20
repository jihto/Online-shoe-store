import { Body, Controller, Get, HttpException, Param, Post, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dtos/CreateCommentDto';

@Controller('comment')
export class CommentController {

    constructor (
        private readonly commentService: CommentService,
    ){}

    @Get('/:id')
    getComments(
        @Param('id') productId: string,
    ): Promise<CommentDto[]>{  
        return this.commentService.getCommentInProduct(productId);
    }


    @Post('create/:id')
    @UseInterceptors(FileInterceptor('picture'))
    createComment(
        @Body() data: CreateCommentDto,
        @Request() req: any,
        @Param('id') productId: string, 
        @UploadedFile() file: Express.Multer.File,
    ): Promise<CommentDto> {   
        return this.commentService.createComment(productId, data.content, file, req.user._id);
    }


    @Put('update/:id')
    updateComment(
        @Param('id') id:string,
        @Body('content') newContent: string,
    ): Promise<HttpException>{
        return this.commentService.updateComment(id,newContent) ;
    }
}
