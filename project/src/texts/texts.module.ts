import { Module } from '@nestjs/common';
import { TextsController } from './texts.controller';
import { TextsService } from './texts.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  controllers: [TextsController],
  providers: [TextsService, NotificationsService],
})
export class TextsModule {}
