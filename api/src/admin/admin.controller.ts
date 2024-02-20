import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService){}
    

    @Get()
    getAdmin() {
        return "Hello admin";
    }

    @Post('signin')
    loginAdmin(
        @Body() { email, password } : any
    ){
        console.log({email, password});
        return this.adminService.signIn(email, password);
    }


    
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(
        @Body() { name, email, password}: any
    ): Promise<HttpException>{  
        return this.adminService.signUp(name, email, password);
    }

    @Post()
    @UseInterceptors(AnyFilesInterceptor())
    createProduct(
        @UploadedFiles() files: Express.Multer.File[],
    ){
        console.log(files);
        return "Create Product "
    }
}
