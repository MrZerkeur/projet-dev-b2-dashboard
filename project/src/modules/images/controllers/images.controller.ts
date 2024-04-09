import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import { NotificationsService } from 'src/modules/notifications/services/notifications.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { SitesService } from 'src/modules/sites/services/sites.service';
import { UserAccessService } from 'src/modules/user-access/services/user-access.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createImageDto } from '../dto/create-image.dto';
import axios from 'axios';
import { Response } from 'express';

@Controller('sites/:name/images')
@UseGuards(AuthenticatedGuard)
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
  async renderAddImage(@Param('name') name: string, @Req() req) {
    const site = await this.sitesService.findOneByNameWithUsersImages(name);
    return this.userAccessService.grantUserAccess(req.user, site);
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  async addImage(
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: createImageDto,
    @Req() req,
    @Res() res: Response,
  ) {
    const site = await this.sitesService.findOneByNameWithUsersImages(name);
    this.userAccessService.grantUserAccess(req.user, site);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const imageName = `${createImageDto.name}.${file.originalname.split('.').pop()!.toLowerCase()}`;
    const image = await this.imagesService.create(
      imageName,
      createImageDto.sectionName,
      site,
    );

    const apiUrl = `http://API:5000/sites/${site.name}/images`;
    const base64EncodedImage = file.buffer.toString('base64');
    const data = {
      base64_encoded_image: base64EncodedImage,
      path: image.path,
    };

    try {
      const response = await axios.post(apiUrl, data);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
    }
    res.redirect(302, `/sites/${site.name}/images`);
  }
}

// this.imagesService.create();
// const resp = await this.notificationService.notifyImageModifications();
// return { response: resp };
