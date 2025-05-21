import { IsArray, IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpsertTaskRequest {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly deadlineDate?: Date;

  @IsString()
  readonly babyId: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly parents?: string[];
}
