import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entity/image.entity';
import { Repository } from 'typeorm';
import { Site } from 'src/modules/sites/entity/site.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  create(name: string, sectionName: string, site: Site): Promise<Image> {
    const image = new Image();
    image.name = name;
    image.sectionName = sectionName;
    image.site = site;
    image.path = `${site.id}/${sectionName}/${name}`;

    return this.imagesRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  findOneById(id: string): Promise<Image | null> {
    return this.imagesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.imagesRepository.delete(id);
  }
}
