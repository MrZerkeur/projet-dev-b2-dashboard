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
  UseGuards,
} from '@nestjs/common';
import { SitesService } from '../services/sites.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UserAccessService } from 'src/modules/user-access/services/user-access.service';
import { Response } from 'express';
import { CreateSiteDto } from '../dto/create-site.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { UpdateSiteDto } from '../dto/update-site-dto';
import { AddSiteUser } from '../dto/add-site-user.dto';

@Controller('sites')
@UseGuards(AuthenticatedGuard)
export class SitesController {
  constructor(
    private sitesService: SitesService,
    private usersService: UsersService,
    private userAccessService: UserAccessService,
  ) {}

  @Get()
  @Render('all-sites')
  async renderAllSites(@Req() req) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }
    return { sites: await this.sitesService.findAll(), loggedInUser: req.user };
  }

  @Get('add')
  @Render('add-site')
  async renderAddSite(@Req() req) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }
    return { loggedInUser: req.user };
  }

  @Post('add')
  async addSite(
    @Body() createSiteDto: CreateSiteDto,
    @Req() req,
    @Res() res: Response,
  ) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }
    await this.sitesService.create(
      createSiteDto.name,
      createSiteDto.host,
      createSiteDto.port.toString(),
    );
    res.redirect(302, '/sites');
  }

  @Get('id/:id')
  @Render('update-site')
  async renderUpdateSite(@Param('id') id: string, @Req() req) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }
    const site = await this.sitesService.findOneById(id);
    if (!site) {
      throw new BadRequestException('Site not found');
    }
    const users = await this.usersService.findAll();
    return { site: site, users: users, loggedInUser: req.user };
  }

  @Post('id/:id')
  async updateSite(
    @Param('id') id: string,
    @Body() updateSiteDto: UpdateSiteDto,
    @Req() req,
    @Res() res: Response,
  ) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }

    const site = await this.sitesService.findOneById(id);
    if (!site) {
      throw new BadRequestException('Site not found');
    }

    if (updateSiteDto.name && updateSiteDto.name != '') {
      site.name = updateSiteDto.name;
    }
    if (updateSiteDto.host && updateSiteDto.host != '') {
      site.host = updateSiteDto.host;
    }
    if (updateSiteDto.port && updateSiteDto.port.toString() != '') {
      site.port = updateSiteDto.port.toString();
    }
    await this.sitesService.update(site);

    res.redirect(302, `/sites/`);
  }

  @Post('add-user/:id')
  async addSiteUser(
    @Param('id') id: string,
    @Body() addSiteUser: AddSiteUser,
    @Req() req,
    @Res() res: Response,
  ) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }

    const site = await this.sitesService.findOneById(id);
    if (!site) {
      throw new BadRequestException('Site not found');
    }

    if (addSiteUser.userEmail && addSiteUser.userEmail != '') {
      const user = await this.usersService.findOneByEmail(
        addSiteUser.userEmail,
      );
      site.users.push(user);
    }
    await this.sitesService.update(site);

    res.redirect(302, `/sites/id/${id}`);
  }

  @Get('remove-user/:id/:email')
  async removeSiteUser(
    @Param('id') id: string,
    @Param('email') email: string,
    @Req() req,
    @Res() res: Response,
  ) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }

    const site = await this.sitesService.findOneById(id);
    if (!site) {
      throw new BadRequestException('Site not found');
    }

    console.log(site.users);

    site.users = site.users.filter((user) => user.email !== email);
    console.log(site.users);

    await this.sitesService.update(site);

    res.redirect(302, `/sites/id/${id}`);
  }

  @Get('delete/:id')
  async deleteSite(@Param('id') id: string, @Req() req, @Res() res: Response) {
    if (!req.user.isAdmin) {
      throw new BadRequestException('aDMIN ONLY');
    }
    await this.sitesService.remove(id);
    res.redirect(302, '/sites/');
  }

  @Get(':name')
  @Render('site-home')
  async findOne(@Param('name') name: string, @Req() req) {
    const site = await this.sitesService.findOneByNameWithUsers(name);
    return this.userAccessService.grantUserAccess(req.user, site);
  }
}
