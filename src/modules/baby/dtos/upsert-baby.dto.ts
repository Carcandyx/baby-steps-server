import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ActivitiesDto } from './upsert-baby-request.dto';

export class PatchBabyDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly birthDate?: Date;

  @IsOptional()
  @IsString()
  readonly weight?: string;

  @IsOptional()
  @IsString()
  readonly height?: string;

  @IsOptional()
  @IsObject()
  readonly activities?: ActivitiesDto;
}
