import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { TextsService } from 'src/modules/texts/services/texts.service';
// import { NotificationsService } from 'src/modules/notifications/services/notifications.service';
import { CreateTextDto } from '../dto/create-text.dto';
import { SitesService } from 'src/modules/sites/services/sites.service';

@Controller('sites/:name/texts')
export class TextsController {
  constructor(
    private sitesService: SitesService,
    private textsService: TextsService,
    // private notificationService: NotificationsService,
  ) {}

  @Get()
  @Render('all-texts')
  async allTexts(@Param('name') name: string) {
    const site = await this.sitesService.findOneByName(name);
    const texts = await this.textsService.findBySite(site);
    site.texts = texts;
    console.log(site);
    return { site: site };
  }

  @Get('add')
  @Render('add-text')
  async renderAddText(@Param('name') name: string) {
    return { site: { name: name } };
  }

  @Post('add')
  async addText(
    @Param('name') name: string,
    @Body() createTextDto: CreateTextDto,
  ) {
    const site = await this.sitesService.findOneByName(name);

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
