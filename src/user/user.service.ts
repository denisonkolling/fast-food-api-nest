import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../common/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    const hashedPassword = await hashPassword(createUserDto.password);

    this.entityManager.assign(user, {
      ...createUserDto,
      password: hashedPassword,
    });

    await this.entityManager.persistAndFlush(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.nativeUpdate({ id }, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.isDeleted = true;

    await this.userRepository.nativeUpdate({ id }, user);

    return user;
  }
}
