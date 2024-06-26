import { Module } from '@nestjs/common';
import { TextsController } from './controllers/texts.controller';
import { TextsService } from './services/texts.service';
import { NotificationsService } from '../notifications/services/notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './entity/text.entity';
import { SitesModule } from '../sites/sites.module';
import { UserAccessModule } from '../user-access/user-access.module';

@Module({
  imports: [TypeOrmModule.forFeature([Text]), SitesModule, UserAccessModule],
  controllers: [TextsController],
  providers: [TextsService, NotificationsService],
})
export class TextsModule {}
