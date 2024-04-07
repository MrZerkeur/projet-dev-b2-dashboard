import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TextsService } from 'src/modules/texts/services/texts.service';
import { NotificationsService } from 'src/modules/notifications/services/notifications.service';
import { CreateTextDto } from '../dto/create-text.dto';
import { SitesService } from 'src/modules/sites/services/sites.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UserAccessService } from 'src/modules/user-access/services/user-access.service';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';

@Controller('sites/:name/texts')
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthExceptionFilter)
export class TextsController {
  constructor(
    private sitesService: SitesService,
    private textsService: TextsService,
    private notificationService: NotificationsService,
    private userAccessService: UserAccessService,
  ) {}

  @Get()
  @Render('all-texts')
  async allTexts(@Param('name') name: string, @Req() req) {
    const site = await this.sitesService.findOneByNameWithUsersTexts(name);
    return this.userAccessService.grantUserAccess(req.user, site);
  }

  @Get('add')
  @Render('add-text')
  async renderAddText(@Param('name') name: string, @Req() req) {
    const site = await this.sitesService.findOneByNameWithUsers(name);
    return this.userAccessService.grantUserAccess(req.user, site);
  }

  @Post('add')
  async addText(
    @Param('name') name: string,
    @Body() createTextDto: CreateTextDto,
    @Req() req,
  ) {
    const site = await this.sitesService.findOneByName(name);
    this.userAccessService.grantUserAccess(req.user, site);

    const text = await this.textsService.create(
      createTextDto.content,
      createTextDto.sectionName,
      site,
    );
    console.log(text);
    return Redirect(`/sites/${name}/texts/`);
    // const resp = await this.notificationService.notifyTextModifications();
    // return { response: resp };
  }
}
