import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  allUsers() {
    return;
  }

  @Get(':id')
  userById(@Param('id') id: string) {
    return `User with the id ${id}`;
  }
}
