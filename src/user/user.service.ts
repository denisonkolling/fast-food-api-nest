//import { type EntityRepository } from '@mikro-orm/postgresql'; when using query builder
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.insert(user);
    return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found');
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
