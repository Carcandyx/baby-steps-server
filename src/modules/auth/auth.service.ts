import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInRequest } from './dtos/sign-in-request.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInRequest: SignInRequest,
  ): Promise<{ user: Partial<UserDocument>; token: string }> {
    const { email, password } = signInRequest;
    const user = await this.userService.getByEmail(email, '-__v');

    const decryptedPassword = this.encryptionService.decrypt(user.password);
    if (password !== decryptedPassword) throw new NotFoundException('Wrong username or password');

    const token = await this.jwtService.signAsync({
      sub: user._id,
      username: user.firstName,
    });

    // Create a new object without the password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user.toObject();

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
