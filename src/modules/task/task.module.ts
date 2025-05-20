import { Module } from '@nestjs/common';
import { Task, TaskSchema } from './task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { BabyModule } from '../baby/baby.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    BabyModule,
    JwtModule,
  ],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
