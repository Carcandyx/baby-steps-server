import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Baby, BabyDocument } from './baby.schema';
import { CreateBabyDto } from './dtos/create-baby.dto';
import { PatchBabyDto } from './dtos/upsert-baby.dto';

@Injectable()
export class BabyRepository {
  constructor(@InjectModel(Baby.name) private babyModel: Model<Baby>) {}

  async findById(parentId: string, babyId: string): Promise<BabyDocument | null> {
    return await this.babyModel.findOne({ _id: babyId, parents: parentId });
  }

  async findAllByParentId(parentId: string): Promise<BabyDocument[]> {
    return await this.babyModel.find({ parents: parentId });
  }

  async create(createBabyDto: CreateBabyDto): Promise<BabyDocument> {
    return await this.babyModel.create(createBabyDto);
  }

  async deleteById(babyId: string): Promise<void> {
    await this.babyModel.deleteOne({ _id: babyId });
  }

  async patchById(babyId: string, patchBabyDto: PatchBabyDto): Promise<void> {
    await this.babyModel.updateOne({ _id: babyId }, { $set: { ...patchBabyDto } });
  }
}
