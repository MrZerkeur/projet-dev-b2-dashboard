import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './site.entity';
import { TextsModule } from 'src/texts/texts.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Site]), TextsModule, ImagesModule],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
