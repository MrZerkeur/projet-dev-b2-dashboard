import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Site } from 'src/modules/sites/entity/site.entity';

@Entity('texts')
export class Text {
  @PrimaryGeneratedColumn('uuid', { name: 'text_id' })
  id: string;

  @Column('text', { name: 'content', nullable: false })
  content: string;

  @Column('varchar', { name: 'section_name', length: 50, nullable: false })
  sectionName: string;

  @ManyToOne(() => Site, (site) => site.texts)
  @JoinColumn({ name: 'site_id' })
  site: Site;
}
