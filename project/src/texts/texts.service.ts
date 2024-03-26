import { Injectable } from '@nestjs/common';
import { Text } from './text.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from 'src/sites/site.entity';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(Text)
    private textsRepository: Repository<Text>,
  ) {}

  create(content: string, sectionName: string, site: Site): Promise<Text> {
    const text = new Text();
    text.content = content;
    text.sectionName = sectionName;
    text.site = site;

    return this.textsRepository.save(text);
  }

  findAll(): Promise<Text[]> {
    return this.textsRepository.find();
  }

  findOneById(id: string): Promise<Text | null> {
    return this.textsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.textsRepository.delete(id);
  }
}
