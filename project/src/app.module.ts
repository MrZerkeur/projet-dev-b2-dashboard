import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { typeOrmConfig } from './config/typeorm';
import { SitesModule } from './modules/sites/sites.module';
import { TextsModule } from './modules/texts/texts.module';
import { ImagesModule } from './modules/images/images.module';
// import { UserAccessModule } from './modules/user-access/user-access.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    SitesModule,
    TextsModule,
    ImagesModule,
    // UserAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
