import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, NotificationsService],
})
export class ImagesModule {}
