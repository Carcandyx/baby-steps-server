import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Baby, BabySchema } from './baby.schema';
import { BabyService } from './baby.service';
import { BabyController } from './baby.controller';
import { BabyRepository } from './baby.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Baby.name, schema: BabySchema }]), JwtModule],
  providers: [BabyService, BabyRepository],
  controllers: [BabyController],
  exports: [BabyService],
})
export class BabyModule {}
