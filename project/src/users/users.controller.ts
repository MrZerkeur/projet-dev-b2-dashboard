import { Controller, Get, Param, Render } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  allUsers() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Get('create')
  @Render('created-user')
  async create() {
    const user = await this.usersService.create(
      'Luc',
      'JeanJean',
      'luc.jeanjean@mail.com',
    );
    return { user: user };
  }
}
