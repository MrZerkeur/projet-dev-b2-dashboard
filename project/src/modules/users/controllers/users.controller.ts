import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('users')
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthExceptionFilter)
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
