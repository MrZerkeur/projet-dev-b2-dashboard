import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log('Exception caught:', exception);
    console.log('Exception stack trace:', exception.stack);

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException ||
      exception instanceof InternalServerErrorException
    ) {
      console.log('Redirecting to /login');
      response.status(302).redirect('/login');
    } else {
      console.log('Redirecting to /not-found');
      response.redirect('/not-found');
    }
  }
}
