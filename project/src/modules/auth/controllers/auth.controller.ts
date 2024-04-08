import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginGuard } from '../../../common/guards/login.guard';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller()
export class AuthController {
  constructor(private userService: UsersService) {}

  @Get('register')
  @Render('register')
  registerPage() {
    return;
  }

  @Post('register')
  @Redirect('login')
  async register(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.findOneByEmail(createUserDto.email)) {
      throw new UnauthorizedException('User already exists');
    }
    const user = await this.userService.create(
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.email,
      createUserDto.password,
      createUserDto.confirmPassword,
    );
    return user;
  }

  @Get('login')
  @Render('login')
  loginPage() {
    return;
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login(@Res() res: Response) {
    res.redirect('/');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  @Render('profile')
  getProfile(@Req() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const logoutError = await new Promise((resolve) =>
      req.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
    );

    if (logoutError) {
      console.error(logoutError);
      throw new InternalServerErrorException('Could not log out user');
    }
    res.redirect(302, '/');
  }
}
