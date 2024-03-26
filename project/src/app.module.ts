import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { TextsModule } from './texts/texts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Site } from './sites/site.entity';
import { Image } from './images/image.entity';
import { Text } from './texts/text.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ImagesModule,
    TextsModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'maria-woman',
      password: 'oui',
      database: 'db_projet_dev',
      entities: [User, Site, Image, Text],
      synchronize: true, //! Remove for production
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
