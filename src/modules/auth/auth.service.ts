import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInRequest } from './dtos/sign-in-request.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInRequest: SignInRequest): Promise<{ access_token: string }> {
    const { email, password } = signInRequest;
    const user = await this.userService.getByEmail(email, 'email password');

    const decryptedPassword = this.encryptionService.decrypt(user.password);
    if (password !== decryptedPassword) throw new NotFoundException('Wrong username or password');

    return {
      access_token: await this.jwtService.signAsync({
        sub: user._id,
        username: user.firstName,
      }),
    };
  }
}
