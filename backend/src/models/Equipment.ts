import { Schema, model, Types } from 'mongoose';


export interface IEquipment {
  name: string;
  equipment_type: string;
  brand: string;
  model: string; 
  serial_number: string;
  inventory_code: string;
  entry_date: Date;
  location: Types.ObjectId;
}

const equipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  equipment_type: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  serial_number: { type: String, required: true },
  inventory_code: { type: String, required: true },
  entry_date: { type: Date, required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true }
}, { timestamps: true });

equipmentSchema.index({
  name: 'text',
  brand: 'text',
  model: 'text',
  serial_number: 'text',
  inventory_code: 'text'
});

export default model<IEquipment>('Equipment', equipmentSchema);