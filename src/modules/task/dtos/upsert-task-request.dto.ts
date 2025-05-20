import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertTaskRequest {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly deadlineDate: Date;

  @IsString()
  readonly babyId: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
