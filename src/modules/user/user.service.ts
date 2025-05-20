import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDocument } from './user.schema';
import { EncryptionService } from 'src/modules/encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userRepository.findByEmail(createUserDto.email, '_id');
    if (user) throw new ConflictException('Email already in use');
    return await this.userRepository.create({
      ...createUserDto,
      password: this.encryptionService.encrypt(createUserDto.password),
    });
  }

  async getByEmail(email: string, projection?: string): Promise<UserDocument> {
    const user = await this.userRepository.findByEmail(email, projection);
    if (!user) throw new NotFoundException('Wrong username or password');
    return user;
  }
}
