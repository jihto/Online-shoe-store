import { MiddlewareConsumer,ClassSerializerInterceptor, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'; 
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';  
import { AuthGuard } from './auth/auth.guard';
// import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor'; 
import { AdminModule } from './admin/admin.module'; 
import { ProductModule } from './product/product.module'; 
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { SellerMiddleware } from './common/middlewares/seller.middleware';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pnjihto123:tPQf5bsmkXiVT4qk@t-spiration.ssykuul.mongodb.net/T-spiration?retryWrites=true&w=majority'), 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    ProductModule,
    CartModule,
    UserModule,
    OrderModule,
    CommentModule, 
  ],
  providers: [
      {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor, 
      }, 
  ], 
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //     .apply(SellerMiddleware)
    //     .forRoutes('product'); // applies JWT authentication middleware to all routes
    consumer
        .apply(AuthMiddleware)
        .forRoutes("user" , "cart", "order", "comment"); //applies middleware to all routes except auth 
}
}
