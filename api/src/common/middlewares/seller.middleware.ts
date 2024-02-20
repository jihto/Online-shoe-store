import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import *  as jwt from "jsonwebtoken";  
import { Observable } from 'rxjs';

@Injectable()
export class SellerMiddleware implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        // Extract the token from the Authorization header
        const token = request.headers.authorization?.split(" ")[1];

        if (!token) {
            return response.status(401).json({ message: "Unauthorized" });
        }

        try {
        // Verify the token
            const decoded = jwt.verify(token, "pnjihto123");

            // Store the decoded user data in the request object
            request.sellerData = decoded;

            // Log the decoded user data
            console.log(decoded);

            // Continue with the request handling
            return next.handle();
        } catch (err) {
            return response.status(401).json({ message: "Unauthorized" });
        }
    }
}