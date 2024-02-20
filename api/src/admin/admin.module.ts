import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller } from 'src/schemas/seller.model';
import { Auth } from 'src/schemas/auth.model';

@Module({
  imports:[ 
    PassportModule,
    JwtModule, 
    MongooseModule.forFeature([Seller, Auth])
  ],
  controllers: [ AdminController ],
  providers: [AdminService]
})
export class AdminModule {}
