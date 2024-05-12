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
import axios from 'axios';
import { Response } from 'express';
import { CreateImageDto } from '../dto/create-image.dto';

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
    @Body() createImageDto: CreateImageDto,
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

    const apiUrl = `http://api:5000/sites/${site.name}/images`;
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
      throw new BadRequestException(error.message);
    }

    console.log(site.tcpPort);

    await this.notificationService.notifyNewImageAdded(
      site.host,
      Number(site.tcpPort),
      image.id,
      site.id,
    ); // ! voir pour le port tcp par rapport à docker

    res.redirect(302, `/sites/${site.name}/images`);
  }

  @Get('delete/:id')
  async deleteImage(
    @Param('name') name: string,
    @Param('id') id: string,
    @Req() req,
    @Res() res: Response,
  ) {
    const site = await this.sitesService.findOneByNameWithUsers(name);
    this.userAccessService.grantUserAccess(req.user, site);
    const apiUrl = `http://api:5000/sites/${site.name}/images`;
    const data = { path: await this.imagesService.getPathById(id) };
    console.log(data);

    await this.imagesService.remove(id);

    try {
      const response = await axios.delete(apiUrl, { data: data });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw new BadRequestException(error.message);
    }

    await this.notificationService.notifyImageDeleted(
      site.host,
      Number(site.tcpPort),
      id,
      site.id,
    ); // ! voir pour le port tcp par rapport à docker

    res.redirect(302, `/sites/${name}/images/`);
  }
}
