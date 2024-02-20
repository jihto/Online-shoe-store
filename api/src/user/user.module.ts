import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([ User])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
