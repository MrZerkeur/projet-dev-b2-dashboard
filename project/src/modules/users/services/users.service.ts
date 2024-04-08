import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    // TODO add real password logic

    if (password !== confirmPassword) {
      throw new UnauthorizedException("Passwords don't match");
    }

    [user.passwordHash, user.salt] = await this.hashPassword(password);

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

  findOneByIdWithSites(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: { sites: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        sites: { name: true },
      },
    });
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

  async hashPassword(plainTextPassword: string): Promise<[string, string]> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(plainTextPassword, salt);

    return [hashedPassword, salt];
  }
}
