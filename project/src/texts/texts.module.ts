import { Module } from '@nestjs/common';
import { TextsController } from './texts.controller';
import { TextsService } from './texts.service';
import { NotificationsService } from '../notifications/notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  controllers: [TextsController],
  providers: [TextsService, NotificationsService],
})
export class TextsModule {}
