import { IsNumber, IsString } from 'class-validator';

export class PatchBabyDto {
  @IsString()
  readonly firstName?: string;

  @IsString()
  readonly lastName?: string;

  @IsNumber()
  readonly months?: number;
}
