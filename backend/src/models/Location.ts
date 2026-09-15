import { Schema, model, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  floor: string;
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  floor: { type: String, required: true }
}, { timestamps: true });

export default model<ILocation>('Location', locationSchema);