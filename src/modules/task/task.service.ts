import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskDocument } from './task.schema';
import { BabyService } from '../baby/baby.service';
import { UpsertTaskRequest } from './dtos/upsert-task-request.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly babyService: BabyService,
  ) {}

  async getAllByBabyId(parentId: string, babyId: string): Promise<TaskDocument[]> {
    await this.babyService.getBabyById(parentId, babyId);
    return await this.taskRepository.findAllByBabyId(babyId);
  }

  async getAllByUserId(userId: string): Promise<TaskDocument[]> {
    return await this.taskRepository.findAllByUserId(userId);
  }

  async create(parentId: string, createTaskRequest: UpsertTaskRequest): Promise<TaskDocument> {
    await this.babyService.getBabyById(parentId, createTaskRequest.babyId);
    return await this.taskRepository.create({
      ...createTaskRequest,
      deadlineDate: createTaskRequest.deadlineDate || new Date(),
      completed: false,
      parents: [parentId],
    });
  }

  async delete(parentId: string, babyId: string, taskId: string): Promise<void> {
    await this.babyService.getBabyById(parentId, babyId);
    await this.taskRepository.deleteById(taskId);
  }

  async patch(
    parentId: string,
    taskId: string,
    patchTaskRequest: Partial<UpsertTaskRequest>,
  ): Promise<void> {
    await this.babyService.getBabyById(parentId, patchTaskRequest.babyId!);
    await this.taskRepository.patchById(taskId, { ...patchTaskRequest });
  }
}
