import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.model';
import { Product } from 'src/schemas/product.model';
import { Comment } from 'src/schemas/comment.model';
import { Cart } from 'src/schemas/cart.model';
import { Order } from 'src/schemas/order.model';

@Module({
  imports:[
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
    MongooseModule.forFeature([Product, User, Comment, Cart, Order]),
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
