import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { TextsService } from './texts.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateTextDto } from './create-text.dto';
// import { SitesService } from 'src/sites/sites.service';

@Controller('texts')
export class TextsController {
  constructor(
    // private sitesService: SitesService,
    private textsService: TextsService,
    private notificationService: NotificationsService,
  ) {}

  @Get()
  @Render('all-texts')
  async allTexts() {
    return { texts: await this.textsService.findAll() };
  }

  @Get('add')
  @Render('add-text')
  renderAddText() {
    return;
  }

  // @Post('add')
  // async addText(@Body() createTextDto: CreateTextDto) {
  //   // TODO Controller for adding text
  //   // const site = await this.sitesService.findOneByName('hayto-dlo');

  //   // this.textsService.create(
  //   //   createTextDto.content,
  //   //   createTextDto.sectionName,
  //   //   site,
  //   // );
  //   // const resp = await this.notificationService.notifyTextModifications();
  //   // return { response: resp };
  // }
}
