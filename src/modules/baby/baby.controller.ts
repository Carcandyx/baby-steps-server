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
}
