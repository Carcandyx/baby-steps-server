import { IsNumber, IsString } from 'class-validator';

export class UpsertBabyRequest {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNumber()
  readonly months: number;
}
