import {
  Controller,
  Get,
  Param,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import { NotificationsService } from 'src/modules/notifications/services/notifications.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { SitesService } from 'src/modules/sites/services/sites.service';
import { UserAccessService } from 'src/modules/user-access/services/user-access.service';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';

@Controller('sites/:name/images')
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthExceptionFilter)
export class ImagesController {
  constructor(
    private imagesService: ImagesService,
    private notificationService: NotificationsService,
    private sitesService: SitesService,
    private userAccessService: UserAccessService,
  ) {}

  @Get()
  @Render('all-images')
  async allImages(@Param('name') name: string, @Req() req) {
    const site = await this.sitesService.findOneByNameWithUsersImages(name);
    return this.userAccessService.grantUserAccess(req.user, site);
  }

  @Get('add')
  @Render('add-image')
  async addImage() {
    // this.imagesService.create();
    // const resp = await this.notificationService.notifyImageModifications();
    // return { response: resp };
  }
}
