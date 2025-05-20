import { IsNumber, IsString } from 'class-validator';

export class CreateBabyDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNumber()
  readonly months: number;

  @IsString()
  readonly parents: string[];
}
