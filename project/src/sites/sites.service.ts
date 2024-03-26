import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './site.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
  ) {}

  findAll(): Promise<Site[]> {
    return this.sitesRepository.find();
  }

  findOneById(id: string): Promise<Site | null> {
    return this.sitesRepository.findOneBy({ id });
  }

  findOneByName(name: string): Promise<Site | null> {
    return this.sitesRepository.findOneBy({ name });
  }

  async remove(id: string): Promise<void> {
    await this.sitesRepository.delete(id);
  }
}
