import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for validating activities data
export class ActivitiesDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly feeding?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly sleep?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly diaper?: Date;
}

export class UpsertBabyRequest {
  @IsString()
  readonly name: string;

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
  @Type(() => ActivitiesDto)
  readonly activities?: ActivitiesDto;
}
