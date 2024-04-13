import {
  BadRequestException,
  Controller,
  Get,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Render('all-users')
  async allUsers(@Req() req) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('Admin only');
    }
    return { users: await this.usersService.findAll(), loggedInUser: req.user };
  }

  // @Get(':id')
  // @Render('user-page')
  // async findOne(@Param('id') id: string, @Req() req) {
  //   if (!req.user.isAdmin) {
  //     throw new BadRequestException('Admin only');
  //   }
  //   return {
  //     user: await this.usersService.findOneById(id),
  //     loggedInUser: req.user,
  //   };
  // }
}
