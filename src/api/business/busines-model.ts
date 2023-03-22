import mongoose, { Schema } from 'mongoose';

export interface Business {
  categories: string;
  nameBusiness: string;
  address: string;
  phone: string;
  profileUrl: string;
  description: string;
  reviews: string[];
  score: number[];
}

const businessSchema = new Schema<Business>({
  categories: String,
  nameBusiness: String,
  address: String,
  phone: String,
  profileUrl: String,
  description: String,
  reviews: [String],
  score: [Number],
});

export const BusinessModel = mongoose.model<Business>(
  'Business',
  businessSchema,
  'business',
);
