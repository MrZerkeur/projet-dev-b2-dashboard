import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  create(): Promise<Image> {
    const image = new Image();

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
