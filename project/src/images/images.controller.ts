import { Controller, Get, Render } from '@nestjs/common';
import { ImagesService } from './images.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Controller('images')
export class ImagesController {
  constructor(
    private imagesService: ImagesService,
    private notificationService: NotificationsService,
  ) {}

  @Get()
  @Render('all-images')
  allImages() {
    return this.imagesService.getAllImages();
  }

  @Get('add')
  @Render('add-image')
  async addImage() {
    this.imagesService.addImage();
    const resp = await this.notificationService.notifyImageModifications();
    return { response: resp };
  }
}
