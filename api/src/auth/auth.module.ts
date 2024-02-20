import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; 
import { JwtModule } from '@nestjs/jwt';    
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth } from 'src/schemas/auth.model';
import { User } from 'src/schemas/user.model'; 

@Module({
  imports:[ 
    PassportModule,
    JwtModule, 
    MongooseModule.forFeature([Auth, User])
  ],
  providers: [
    AuthService,  
  ],
  controllers: [AuthController]
})

export class AuthModule {}
