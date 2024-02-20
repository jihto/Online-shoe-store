import { Injectable } from '@nestjs/common'; 
import OpenAI from 'openai';
@Injectable()
export class UsersService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: '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',
            // other configurations if needed
        })
    }
    async getUser(): Promise<{password: string, username:string, id: string}>{
        return {
            username:"JIHto",
            id:"123",
            password: "Pass"
        };
    } 

    async createImage(prompt: string): Promise<any> {
        // Use the OpenAI instance to make API requests 
        const response = await this.openai.images.generate({
            model: "dall-e-3",
            prompt, 
        }); 
        return response.data[0].url; // Adjust this based on the actual response structure
    }
}
