/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Delete, Get, Patch, Post, Param, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpsertTaskRequest } from './dtos/upsert-task-request.dto';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  async create(@Req() request, @Body() createTaskRequest: UpsertTaskRequest) {
    const { user } = request;
    return await this.taskService.create(user.sub as string, createTaskRequest);
  }

  @Delete('/')
  async delete(@Req() request, @Body('babyId') babyId: string, @Body('taskId') taskId: string) {
    const { user } = request;
    return await this.taskService.delete(user.sub as string, babyId, taskId);
  }

  @Get('/baby/:babyId')
  async getAllByBabyId(@Req() request, @Param('babyId') babyId: string) {
    const { user } = request;
    return await this.taskService.getAllByBabyId(user.sub as string, babyId);
  }

  @Get('/')
  async getAllByUserId(@Req() request) {
    const { user } = request;
    return await this.taskService.getAllByUserId(user.sub as string);
  }

  @Patch('/:taskId')
  async patch(
    @Req() request,
    @Param('taskId') taskId: string,
    @Body() patchTaskRequest: Partial<UpsertTaskRequest>,
  ) {
    const { user } = request;
    return await this.taskService.patch(user.sub as string, taskId, patchTaskRequest);
  }
}
