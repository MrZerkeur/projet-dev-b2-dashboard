import { Controller, Get, Render } from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import { NotificationsService } from 'src/modules/notifications/services/notifications.service';

@Controller('images')
export class ImagesController {
  constructor(
    private imagesService: ImagesService,
    private notificationService: NotificationsService,
  ) {}

  @Get()
  @Render('all-images')
  allImages() {
    return this.imagesService.findAll();
  }

  @Get('add')
  @Render('add-image')
  async addImage() {
    // this.imagesService.create();
    // const resp = await this.notificationService.notifyImageModifications();
    // return { response: resp };
  }
}
