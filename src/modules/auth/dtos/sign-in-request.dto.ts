import { IsEmail, IsString } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
