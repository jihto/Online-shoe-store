import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MulterModule } from '@nestjs/platform-express'; 
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.model';
import { Product } from 'src/schemas/product.model';
import { Seller } from 'src/schemas/seller.model';
import { Order } from 'src/schemas/order.model';

@Module({
  imports:[
    //MulterModule.register({
        //storage: storage,
        //limits: {
        //fileSize: 10 * 1024 * 1024, // 10MB (increase as needed)
        //},
        //}),
    MulterModule.register({
        dest: './uploads/images',
        fileFilter: (req, file, callback) => {
            // Check if the file is an image
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    }),
    MongooseModule.forFeature([Product, User, Seller, Order]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
