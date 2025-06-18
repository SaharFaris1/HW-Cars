import mongoose, { Schema, Document } from 'mongoose';

export interface CarMake extends Document {
  id: string;          
  country: string;
  brand: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const carMakeSchema = new Schema<CarMake>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,   
    versionKey: false   
  }
)

export default mongoose.model<CarMake>('CarMake', carMakeSchema);

