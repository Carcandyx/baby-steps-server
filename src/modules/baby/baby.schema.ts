import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EGender } from './baby.enum';

export type BabyDocument = HydratedDocument<Baby>;

// Simple interface for activities instead of a schema
export interface Activities {
  feeding?: Date;
  sleep?: Date;
  diaper?: Date;
}

@Schema()
export class Baby {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop()
  weight: string;

  @Prop()
  height: string;

  @Prop()
  gender: EGender;

  @Prop({ type: Object })
  activities: Activities;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  parents: mongoose.Schema.Types.ObjectId[];
}

export const BabySchema = SchemaFactory.createForClass(Baby);
