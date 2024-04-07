import { Module } from '@nestjs/common';
import { SitesService } from './services/sites.service';
import { SitesController } from './controllers/sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entity/site.entity';
import { UserAccessModule } from '../user-access/user-access.module';

@Module({
  imports: [TypeOrmModule.forFeature([Site]), UserAccessModule],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService],
})
export class SitesModule {}
