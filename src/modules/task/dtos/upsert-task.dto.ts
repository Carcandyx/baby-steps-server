import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';

export class UpsertTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly deadlineDate: Date;

  @IsString()
  readonly babyId: string;

  @IsBoolean()
  readonly completed: boolean;

  @IsArray()
  @IsString({ each: true })
  readonly parents: string[];
}
