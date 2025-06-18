import mongoose, { Schema, Document } from 'mongoose';

export interface Car extends Document {
  id: string;          
  dealerId: string;     
  carMakeId: string;   
  name: string;
  price: string;
  year: string;
  color: string;
  wheelsCount: string;
  createdAt?: Date;
  updatedAt?: Date;
}


const carSchema = new Schema<Car>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    dealerId: {
      type: String,
      required: true,
    },
    carMakeId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    wheelsCount: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,    
    versionKey: false    
  }
);


export default mongoose.model<Car>('Car', carSchema);

