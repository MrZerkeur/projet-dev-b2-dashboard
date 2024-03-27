import { Module } from '@nestjs/common';
import { SitesService } from './services/sites.service';
import { SitesController } from './controllers/sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entity/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
