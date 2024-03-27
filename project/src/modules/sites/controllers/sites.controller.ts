import { Controller, Get, Param, Render } from '@nestjs/common';
import { SitesService } from '../services/sites.service';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get(':id')
  @Render('site-home')
  async findOne(@Param('id') id: string) {
    return { site: await this.sitesService.findOneById(id) };
  }

  @Get('create')
  async create() {
    return;
  }
}
