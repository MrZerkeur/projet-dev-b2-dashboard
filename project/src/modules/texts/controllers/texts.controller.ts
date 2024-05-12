import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TextsService } from 'src/modules/texts/services/texts.service';
import { NotificationsService } from 'src/modules/notifications/services/notifications.service';
import { CreateTextDto } from '../dto/create-text.dto';
import { SitesService } from 'src/modules/sites/services/sites.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UserAccessService } from 'src/modules/user-access/services/user-access.service';
import { Response } from 'express';

@Controller('sites/:name/texts')
@UseGuards(AuthenticatedGuard)
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
    @Res() res: Response,
  ) {
    const site = await this.sitesService.findOneByNameWithUsersTexts(name);
    this.userAccessService.grantUserAccess(req.user, site);

    const text = await this.textsService.create(
      createTextDto.content,
      createTextDto.sectionName,
      site,
    );
    console.log(text);
    res.redirect(302, `/sites/${name}/texts/`);
    // const resp = await this.notificationService.notifyTextModifications();
    // return { response: resp };
  }

  @Get(':id')
  @Render('update-text')
  async renderUpdateText(
    @Param('name') name: string,
    @Param('id') id: string,
    @Req() req,
  ) {
    const site = await this.sitesService.findOneByNameWithUsers(name);
    this.userAccessService.grantUserAccess(req.user, site);
    const text = await this.textsService.findOneById(id);
    return { site: site, text: text, loggedInUser: req.user };
  }

  @Post(':id')
  async updateText(
    @Param('name') name: string,
    @Param('id') id: string,
    @Body() createTextDto: CreateTextDto,
    @Req() req,
    @Res() res: Response,
  ) {
    const site = await this.sitesService.findOneByNameWithUsersTexts(name);
    this.userAccessService.grantUserAccess(req.user, site);

    const text = await this.textsService.findOneById(id);
    if (createTextDto.content && createTextDto.content != '') {
      text.content = createTextDto.content;
    }
    if (createTextDto.sectionName && createTextDto.sectionName != '') {
      text.sectionName = createTextDto.sectionName;
    }
    await this.textsService.update(text);

    res.redirect(302, `/sites/${name}/texts/`);
    // const resp = await this.notificationService.notifyTextModifications();
    // return { response: resp };
  }

  @Get('delete/:id')
  async deleteText(
    @Param('name') name: string,
    @Param('id') id: string,
    @Req() req,
    @Res() res: Response,
  ) {
    const site = await this.sitesService.findOneByNameWithUsers(name);
    this.userAccessService.grantUserAccess(req.user, site);
    await this.textsService.remove(id);
    res.redirect(302, `/sites/${name}/texts/`);
  }
}
