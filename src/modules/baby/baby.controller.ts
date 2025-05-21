/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BabyService } from './baby.service';
import { UpsertBabyRequest } from './dtos/upsert-baby-request.dto';

@Controller('baby')
@UseGuards(AuthGuard)
export class BabyController {
  constructor(private readonly babyService: BabyService) {}

  @Get('/')
  async getAllByParentId(@Req() request) {
    const { user } = request;
    return await this.babyService.getAllByParentId(user.sub as string);
  }

  @Get('/:babyId')
  async getById(@Req() request, @Param('babyId') babyId: string) {
    const { user } = request;
    return await this.babyService.getBabyById(user.sub as string, babyId);
  }

  @Post('/')
  async create(@Req() request, @Body() createBabyRequest: UpsertBabyRequest) {
    const { user } = request;
    return await this.babyService.create(user.sub as string, createBabyRequest);
  }

  @Delete('/')
  async delete(@Req() request, @Body('babyId') babyId: string) {
    const { user } = request;
    return await this.babyService.delete(user.sub as string, babyId);
  }

  @Patch('/:babyId')
  async patch(
    @Req() request,
    @Param('babyId') babyId: string,
    @Body() patchBabyRequest: UpsertBabyRequest,
  ) {
    const { user } = request;
    return await this.babyService.patch(user.sub as string, babyId, patchBabyRequest);
  }

  @Patch('/:babyId/feeding')
  async updateFeeding(@Req() request, @Param('babyId') babyId: string) {
    const { user } = request;
    return await this.babyService.patch(user.sub as string, babyId, {
      activities: { feeding: new Date() },
    });
  }

  @Patch('/:babyId/sleep')
  async updateSleep(@Req() request, @Param('babyId') babyId: string) {
    const { user } = request;
    return await this.babyService.patch(user.sub as string, babyId, {
      activities: { sleep: new Date() },
    });
  }

  @Patch('/:babyId/diaper')
  async updateDiaper(@Req() request, @Param('babyId') babyId: string) {
    const { user } = request;
    return await this.babyService.patch(user.sub as string, babyId, {
      activities: { diaper: new Date() },
    });
  }
}
