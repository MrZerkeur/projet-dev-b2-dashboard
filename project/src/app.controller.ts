import { Get, Controller, Render, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { UsersService } from './modules/users/services/users.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('index')
  async root(@Req() req) {
    const user = await this.usersService.findOneByIdWithSites(req.user.id);
    console.log(user, user.sites);
    return user;
  }

  @Get('not-found')
  @Render('not-found')
  notFound() {
    return;
  }
}
