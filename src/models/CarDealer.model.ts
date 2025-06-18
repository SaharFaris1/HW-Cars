import mongoose, { Schema, Document } from 'mongoose';

export interface CarDealer extends Document {
  id: string;          
  name: string;
  email: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const carDealerSchema = new Schema<CarDealer>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,     
    versionKey: false   
  }
);


export default mongoose.model<CarDealer>('CarDealer', carDealerSchema);

