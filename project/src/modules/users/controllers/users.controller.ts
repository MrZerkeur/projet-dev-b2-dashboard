import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async allUsers() {
    return { users: await this.usersService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { user: await this.usersService.findOneById(id) };
  }
}
