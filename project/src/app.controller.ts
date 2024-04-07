import { Get, Controller, Render, UseGuards, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private appService: AppService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('index')
  root() {
    return;
  }

  @Get('not-found')
  @Render('error')
  error() {
    return;
  }
}
