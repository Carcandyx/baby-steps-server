import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Baby, BabySchema } from './baby.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Baby.name, schema: BabySchema }])],
})
export class BabyModule {}
