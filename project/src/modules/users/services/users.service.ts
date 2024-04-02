import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(
    firstName: string,
    lastName: string,
    email: string,
    // * password: string,
    // * confirmPassword: string,
  ): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    // TODO add real password logic
    user.passwordHash = 'passwordhashed';
    user.salt = 'salt';

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    // * password: string,
    // * confirmPassword: string,
  ): Promise<User> {
    const user = await this.findOneById(userId);
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    // TODO add password update logic
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
