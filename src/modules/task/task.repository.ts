import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { UpsertTaskDto } from './dtos/upsert-task.dto';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findById(babyId: string, taskId: string): Promise<TaskDocument | null> {
    return await this.taskModel.findOne({ _id: taskId, babyId });
  }

  async findAllByBabyId(babyId: string): Promise<TaskDocument[]> {
    return await this.taskModel.find({ babyId });
  }

  async findAllByUserId(userId: string): Promise<TaskDocument[]> {
    return await this.taskModel.find({ parents: userId });
  }

  async create(createTaskDto: UpsertTaskDto): Promise<TaskDocument> {
    return await this.taskModel.create(createTaskDto);
  }

  async deleteById(taskId: string): Promise<void> {
    await this.taskModel.deleteOne({ _id: taskId });
  }

  async patchById(
    taskId: string,
    patchTaskDto: Partial<Omit<UpsertTaskDto, 'babyId'>>,
  ): Promise<void> {
    await this.taskModel.updateOne({ _id: taskId }, { $set: { ...patchTaskDto } });
  }
}
