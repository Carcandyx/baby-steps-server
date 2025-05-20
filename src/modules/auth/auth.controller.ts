import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignInRequest } from './dtos/sign-in-request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInRequest) {
    return await this.authService.signIn(body);
  }
}
