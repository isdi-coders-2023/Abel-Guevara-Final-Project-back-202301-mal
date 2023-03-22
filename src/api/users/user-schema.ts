import mongoose, { Schema } from 'mongoose';

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  imageUrl: string;
}

const userSchema = new Schema<User>({
  name: String,
  surname: String,
  email: String,
  password: String,
  imageUrl: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
