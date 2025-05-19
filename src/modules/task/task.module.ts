import { Module } from '@nestjs/common';
import { Task, TaskSchema } from './task.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
})
export class TaskModule {}
