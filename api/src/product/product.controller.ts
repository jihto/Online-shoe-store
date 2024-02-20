/* eslint-disable prettier/prettier */
import { Body, Request, Controller,Query, Get, Post,Put, UseInterceptors, Param, UploadedFile, HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dtos/product.dto';
import { ProductService } from './product.service'; 
import { SortOrder } from 'mongoose';
import { SellerMiddleware } from 'src/common/middlewares/seller.middleware'; 
import * as sharp from 'sharp';
import * as fs from 'fs'


@Controller('product')
export class ProductController {

    constructor (
        private readonly productService: ProductService,
    ){}


    
    @Get()
    getProduct(
        @Query('sort') sort: SortOrder,
        @Query('search') search: string, 
    ): Promise<ProductDto[]>{  
        return this.productService.searchProduct(sort, search);
    }
    
    @Get('statistic')
    @UseInterceptors(SellerMiddleware) 
    getStatistic(
        @Request() request: any
    ): Promise<any>{ 
        return this.productService.statisticProduct(request.sellerData._id);
    }

    @Get('admin')
    @UseInterceptors(SellerMiddleware) 
    getProductSeller(
        @Request() request: any
    ): Promise<ProductDto[]>{ 
        return this.productService.getProductsSeller(request.sellerData);
    }
    @Get('isDeleted')
    @UseInterceptors(SellerMiddleware) 
    getProductDeleted(
        @Request() request: any
    ): Promise<ProductDto[]>{ 
        return this.productService.getProductDeleted(request.sellerData);
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('picture'))
    async searchByImage(
        @UploadedFile() file: Express.Multer.File,
    ):Promise<ProductDto[]> { 
        return this.productService.findSimilarProducts(file.path);
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('picture'))
    createProduct(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CreateProductDto,
    ): Promise<ProductDto>{   
        return this.productService.createProduct(file, data);
    }

    @Put('update/:id')
    @UseInterceptors(FileInterceptor('picture'))
    updateProduct(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') _id: string, 
        @Body() data: UpdateProductDto,
    ): Promise<ProductDto>{    
        return this.productService.updateProduct(_id, file, data);
    }

    @Post('delete/:id')
    deleteProduct(
        @Param('id') _id: string,
    ): Promise<HttpException>{
        return this.productService.deleteProduct(_id);
    }

    @Post('restore/:id')
    retoreProduct(
        @Param('id') _id: string,
    ): Promise<HttpException>{
        return this.productService.restoreProduct(_id);
    }  

    

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file); 
        try {
            if (!file || !file.path) {
                return { message: 'Invalid input: File path is empty or undefined' };
            }

            // Read the file buffer directly from the disk
            const fileBuffer = fs.readFileSync(file.path);

            // Check image format compatibility
            const supportedFormats = ['jpeg', 'png', 'gif', 'webp'];
            const metadata = await sharp(fileBuffer).metadata();

            if (!metadata.format || !supportedFormats.includes(metadata.format.toLowerCase())) {
                return { message: `Unsupported image format: ${metadata.format}` };
            }

            const isShoeImage = await this.productService.isShoeImage(fileBuffer);

            if (isShoeImage) {
                return { message: 'It is a shoe image!' };
            } else {
                return { message: 'It is not a shoe image!' };
            }
        } catch (error) {
            console.error('Error processing image:', error);
            return { message: 'Error processing image' };
        }
    } 
}
