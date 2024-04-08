import { BadRequestException, Injectable } from '@nestjs/common';
import { Text } from '../entity/text.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from 'src/modules/sites/entity/site.entity';

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

  update(text: Text): Promise<Text> {
    return this.textsRepository.save(text);
  }

  findAll(): Promise<Text[]> {
    return this.textsRepository.find();
  }

  findOneById(id: string): Promise<Text | null> {
    return this.textsRepository.findOneBy({ id });
  }

  findBySite(site: Site): Promise<Text[] | null> {
    return this.textsRepository.find({ where: { site: site } });
  }

  async remove(id: string): Promise<void> {
    if (!(await this.findOneById(id))) {
      throw new BadRequestException(`Cannot remove text with id ${id}`);
    }
    await this.textsRepository.delete(id);
  }
}
