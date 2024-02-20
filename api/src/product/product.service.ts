/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose, SortOrder } from 'mongoose'; 
import { IProduct } from 'src/schemas/product.model'; 
import { SortType } from './dtos/Sort.enum';
import * as ImageHash from 'image-hash'; 
import { ISeller } from 'src/schemas/seller.model';  
import * as sharp from 'sharp';
import { createCanvas, loadImage } from 'canvas';
import { IOrder } from 'src/schemas/order.model';

@Injectable()
export class ProductService {
    constructor( 
        @InjectModel('Order') private readonly OrderModel:Model<IOrder>,
        @InjectModel('Product') private readonly productModel:Model<IProduct>,
        @InjectModel('Seller') private readonly sellerModel:Model<ISeller>,
    ) { }
    async isShoeImage(buffer: Buffer): Promise<boolean> {
        try {
            if (!buffer || buffer.length === 0) {
                throw new Error('Invalid input: Buffer is empty or undefined');
            } 
            const supportedFormats = ['jpeg', 'png', 'gif', 'webp'];
            const metadata = await sharp(buffer).metadata();

            if (!metadata.format || !supportedFormats.includes(metadata.format.toLowerCase())) {
                throw new Error(`Unsupported image format: ${metadata.format}`);
            }

            const prominentColors = await this.getProminentColors(buffer);
            const hasBrownColor = this.hasBrownColor(prominentColors);

            return hasBrownColor;
        } catch (error) {
            console.error('Error processing image:', error);
            throw new Error('Error processing image');
        }
    }

    private async getProminentColors(buffer: Buffer): Promise<string[]> {
        try {
            const resizedImage = sharp(buffer).resize(100, 100);
            const pixelData = await resizedImage.raw().toBuffer({ resolveWithObject: true });
            const pixels = pixelData.data; 
            const colorCount = new Map();

            for (let i = 0; i < pixels.length; i += 4) {
                const color = `${pixels[i]},${pixels[i + 1]},${pixels[i + 2]}`;
                colorCount.set(color, (colorCount.get(color) || 0) + 1);
            }

            const sortedColors = [...colorCount.entries()].sort((a, b) => b[1] - a[1]);
            const topColors = sortedColors.slice(0, 5).map((color) => color[0]);

            return topColors;
        } catch (error) {
            console.error('Error getting prominent colors:', error);
            throw new Error('Error getting prominent colors');
        }
    }

    private hasBrownColor(colors: string[]): boolean { 
        const brownColorRanges = [
            [100, 150],  
            [50, 100],   
            [0, 50],     
        ];

        for (const color of colors) {
            const [r, g, b] = color.split(',').map(Number);

            // Check if the color is in the brown range
            const isBrown = brownColorRanges.every(([min, max], index) => r >= min && r <= max && g >= min && g <= max && b >= min && b <= max);

            if (isBrown) {
                return true;
            }
        }

        return false;
    } 
    private getMonthlyProductCounts = async () => {
        try {  
        const monthlyCounts = Array(12).fill(0);
      
          // Thực hiện truy vấn aggregation
          const result = await this.productModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`2024-01-01`),
                        $lt: new Date(`2024-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
          ]);
       
        result.forEach(item => {
            const index = item._id - 1;
            monthlyCounts[index] = item.count;
        }); 
        return monthlyCounts;
        } catch (error) {
          console.error("Error during aggregation:", error);
          throw error;
        }
      };






    private calculateImageHash (imagePath: string):Promise<string>{
        return new Promise((resolve, reject) => {
            ImageHash.imageHash(imagePath, 16, true, (error, hashData) => {
                if (error) {
                    reject(error);
                } else {
                    // Resolve the Promise with the hashData
                    resolve(hashData);
                }
            });
        })
    }; 
    private calculateHammingDistance(hash1: string, hash2: string): number {
        let distance = 0;
        for (let i = 0; i < hash1.length; i++) {
            if (hash1[i] !== hash2[i]) {
                distance++;
            }
        }
        return distance;
    }

    async findSimilarProducts(queryPicture: string): Promise<ProductDto[]> {
        const queryHash = await this.calculateImageHash(queryPicture);
        //Get all product in db
        const products = await this.productModel.find({ pictureHash: { $ne: null } }).lean().exec()
        // Find products with similar image hashes
        const finalSearch = products.filter(product => {
            const hammingDistance = this.calculateHammingDistance(queryHash, product.pictureHash);
            return hammingDistance <= 26; // Adjust the threshold as needed
        }); 
        return finalSearch.map(item => new ProductDto(item));
    }

    private ordersInMonth = async (sellerId: string) => {
        const { ObjectId } = mongoose.Types;
        const result = await this.OrderModel.aggregate([
            {
                $match: {
                    dateOfPurchase: {
                        $gte: new Date(`2024-01-01`),
                        $lt: new Date(`2024-01-07`)
                    }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'cart.products.product',
                    foreignField: '_id',
                    as: 'purchasedProducts',
                },
            },
            // {
            //     $unwind: '$purchasedProducts',
            // },
            // {
            //     $match: {
            //         'purchasedProducts.seller': new ObjectId(sellerId),
            //     },
            // },
            // {
            //     $group: {
            //         _id: { $dayOfWeek: '$dateOfPurchase' },
            //         count: { $sum: 1 },
            //     },
            // },
            // {
            //     $project: {
            //         _id: 0,
            //         dayOfWeek: '$_id',
            //         count: 1,
            //     },
            // },
            // {
            //     $sort: { dayOfWeek: 1 },
            // },
        ]);
        console.log(result)
    }; 

    async getProductsSeller(seller:any): Promise<ProductDto[]>{  
        try{ 
            const listsProduct = 
                await this.productModel
                    .find({seller: seller._id, isDeleted: false }) // Checking which product contain letter in search
                    .lean(); 
            return listsProduct.map(product => new ProductDto(product));
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
    }
    async getProductDeleted(seller:any): Promise<ProductDto[]>{  
        try{ 
            const listsProduct = 
                await this.productModel
                    .find({seller: seller._id, isDeleted: true }) // Checking which product contain letter in search
                    .lean();  
            return listsProduct.map(product => new ProductDto(product));
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
    }

    async statisticProduct(sellerId: string){
        try {  
            const totalProduct = await this.productModel.countDocuments({ seller: sellerId });
            const soldProductsCount = await this.productModel.countDocuments({ buyer: { $exists: true }, seller: sellerId });
            const deletedProductsCount = await this.productModel.countDocuments({ isDeleted: true, seller: sellerId});
            const month = await this.getMonthlyProductCounts();  

            const result = { totalProduct, soldProductsCount, deletedProductsCount, month }; 
            return result; 
        } catch (error) {
            console.log(error.message);
            
        }
    }

    async searchProduct( 
        sort: SortOrder,
        search: string
    ): Promise<ProductDto[]>{  
        try{
            const listsProduct = 
                await this.productModel
                    .find({ name: new RegExp(search, 'i') }) // Checking which product contain letter in search
                    .sort([[SortType.Name, sort || 'asc']]) // set default is asc if sort is empty
                    .lean(); 
            return listsProduct.map(product => new ProductDto(product));
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
    }


    createProduct = async (
        file: Express.Multer.File,
        data: CreateProductDto
    ): Promise<ProductDto> => {
        try {     
            const hash = await this.calculateImageHash(file.path);
            // const isSeller = await this.sellerModel.findOne({ _id:data.seller });
            // if(!isSeller)
            //     throw new HttpException("Is not seller" , HttpStatus.BAD_REQUEST);
            const productData = {
                ...data,
                picture: file.filename,
                pictureHash: hash,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };   
            const newProduct = await this.productModel.create(productData);  
            return new ProductDto(newProduct.toObject());
        } catch (error: any) {
            throw new NotAcceptableException(error.message);
        }
    };

    updateProduct = async(
        _id: string, 
        file: Express.Multer.File,
        data: UpdateProductDto,
    ): Promise<ProductDto> => {
        try {  
            const product = await this.productModel.findOne({ _id });
            console.log(product.picture); 
            const update = {
                $set: {
                    ...(data.name && { name: data.name }),
                    ...(data.description && { description: data.description }),
                    ...(data.price && { price: data.price } ), 
                    ...({ picture:file ?  file.filename : product.picture }),  
                    updatedAt: Date.now(), 
                }, 
            }  
            console.log(update);
            const updateProduct = await this.productModel.findByIdAndUpdate({ _id }, update).lean();
            return new ProductDto({});
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    deleteProduct = async (_id:string):  Promise<HttpException> => {
        try{
            const softDelete = await this.productModel.updateOne(
                {_id},
                {$set:
                    {
                        isDeleted: true, 
                        updatedAt: Date.now() 
                    }
                });
            if(!softDelete)
                throw new HttpException("Process Error", HttpStatus.BAD_REQUEST);
            return new HttpException("Delete successfull", HttpStatus.OK);
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
    }
    restoreProduct = async (_id:string):  Promise<HttpException> => {
        try{
            const restore = await this.productModel.updateOne(
                { _id },
                {$set:
                    { isDeleted: false, 
                        updatedAt: Date.now() 
                    }
                });
            if(!restore)
                throw new HttpException("Process Error", HttpStatus.BAD_REQUEST);
            return new HttpException("restore successfull", HttpStatus.OK);
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
    } 
}
