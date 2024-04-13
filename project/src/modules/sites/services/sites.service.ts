import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from '../entity/site.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private readonly sitesRepository: Repository<Site>,
  ) {}

  create(name: string, host: string, port: string): Promise<Site> {
    const site = new Site();
    site.name = name;
    site.host = host;
    site.port = port;
    return this.sitesRepository.save(site);
  }

  update(site: Site): Promise<Site> {
    return this.sitesRepository.save(site);
  }

  findAll(): Promise<Site[]> {
    return this.sitesRepository.find({
      relations: {
        users: true,
      },
    });
  }

  findOneById(id: string): Promise<Site | null> {
    return this.sitesRepository.findOne({
      where: { id: id },
      relations: { users: true },
    });
  }

  findOneByName(name: string): Promise<Site | null> {
    return this.sitesRepository.findOneBy({ name });
  }

  findOneByNameWithUsers(name: string): Promise<Site | null> {
    return this.sitesRepository.findOne({
      where: { name: name },
      select: {
        id: true,
        name: true,
        users: { id: true, email: true, firstName: true, lastName: true },
      },
      relations: { users: true },
    });
  }

  findOneByNameWithUsersTexts(name: string): Promise<Site | null> {
    return this.sitesRepository.findOne({
      where: { name: name },
      select: {
        id: true,
        name: true,
        users: { id: true, email: true, firstName: true, lastName: true },
        texts: { id: true, content: true, sectionName: true },
      },
      relations: {
        users: true,
        texts: true,
      },
    });
  }

  findOneByNameWithUsersImages(name: string): Promise<Site | null> {
    return this.sitesRepository.findOne({
      where: { name: name },
      select: {
        id: true,
        name: true,
        users: { id: true, email: true, firstName: true, lastName: true },
        images: { id: true, name: true, sectionName: true, path: true },
      },
      relations: {
        users: true,
        images: true,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.sitesRepository.delete(id);
  }
}
