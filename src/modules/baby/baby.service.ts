import { Injectable, NotFoundException } from '@nestjs/common';
import { BabyRepository } from './baby.repository';
import { BabyDocument } from './baby.schema';
import { UpsertBabyRequest } from './dtos/upsert-baby-request.dto';

@Injectable()
export class BabyService {
  constructor(private readonly babyRepository: BabyRepository) {}

  async getAllByParentId(parentId: string): Promise<BabyDocument[]> {
    return await this.babyRepository.findAllByParentId(parentId);
  }

  async create(parentId: string, createBabyRequest: UpsertBabyRequest): Promise<BabyDocument> {
    return await this.babyRepository.create({ ...createBabyRequest, parents: [parentId] });
  }

  async delete(parentId: string, babyId: string): Promise<void> {
    await this.getBabyById(parentId, babyId);
    await this.babyRepository.deleteById(babyId);
  }

  async patch(
    parentId: string,
    babyId: string,
    patchBabyRequest: Partial<UpsertBabyRequest>,
  ): Promise<void> {
    await this.getBabyById(parentId, babyId);
    await this.babyRepository.patchById(babyId, patchBabyRequest);
  }

  async getBabyById(parentId: string, babyId: string) {
    const baby = await this.babyRepository.findById(parentId, babyId);
    if (!baby) throw new NotFoundException('Baby not found');
    return baby;
  }
}
