import {
  Controller,
  Get,
  Param,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { SitesService } from '../services/sites.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UserAccessService } from 'src/modules/user-access/services/user-access.service';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';

@Controller('sites')
@UseFilters(AuthExceptionFilter)
export class SitesController {
  constructor(
    private sitesService: SitesService,
    private userAccessService: UserAccessService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get(':name')
  @Render('site-home')
  async findOne(@Param('name') name: string, @Req() req) {
    const site = await this.sitesService.findOneByNameWithUsers(name);
    return this.userAccessService.grantUserAccess(req.user, site);
  }

  // @Get('create')
  // async create() {
  //   return;
  // }
}
