import { Module } from '@nestjs/common';
import { TextsController } from './controllers/texts.controller';
import { TextsService } from './services/texts.service';
import { NotificationsService } from '../notifications/services/notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './entity/text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  controllers: [TextsController],
  providers: [TextsService, NotificationsService],
})
export class TextsModule {}
