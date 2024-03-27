import { Module } from '@nestjs/common';
import { ImagesController } from './controllers/images.controller';
import { ImagesService } from './services/images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from '../notifications/services/notifications.service';
import { Image } from './entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService, NotificationsService],
})
export class ImagesModule {}
