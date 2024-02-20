import { Document, Schema } from 'mongoose'; // Updated import statement
import { Role } from 'src/common/types/Roles.enum';

const AuthSchema = new Schema({
    email: { type: String, required: true, unique: true }, // Fix typo here
    password: { type: String, required: true },
    token: { type: String },
    role: { type: String, enum: [Role.USER, Role.ADMIN], default: Role.USER },
});

export interface IAuth extends Document {
    _id: string;
    email: string;
    password: string;
    role: Role;
    token: string;
}

export const Auth = { name: 'Auth', schema: AuthSchema };

