import { Controller, Get, Param, Render } from '@nestjs/common';
import { SitesService } from '../services/sites.service';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get(':name')
  @Render('site-home')
  async findOne(@Param('name') name: string) {
    return { site: await this.sitesService.findOneByName(name) };
  }

  // @Get('create')
  // async create() {
  //   return;
  // }
}
