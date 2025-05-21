import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  completed?: boolean;

  @Prop()
  completionDate?: Date;

  @Prop()
  deadlineDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Baby' })
  babyId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  parents: mongoose.Schema.Types.ObjectId[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
