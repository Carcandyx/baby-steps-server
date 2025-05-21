import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignInRequest } from './dtos/sign-in-request.dto';
import { SignUpRequest } from './dtos/sign-up-request.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInRequest) {
    return await this.authService.signIn(body);
  }

  @Post('/sign-up')
  @HttpCode(201)
  async signUp(@Body() body: SignUpRequest) {
    const newUser = await this.userService.create(body);
    return await this.authService.signIn({ email: newUser.email, password: body.password });
  }
}
