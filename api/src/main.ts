import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable CORS
    const corsOptions: CorsOptions = {
      origin:'http://localhost:5173', // Replace with your frontend's origin
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, 
    };
    await app.enableCors(corsOptions); 
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //option is used to remove any extra fields that are not explicitly defined in the DTO (Data Transfer Object) being validated.
        transform: true,
        transformOptions:{
          enableImplicitConversion: true,
        }
      })
    )
  app.use('/uploads/images', express.static(path.join(process.cwd(), 'uploads/images')));
  await app.listen(3000);
}
bootstrap();
