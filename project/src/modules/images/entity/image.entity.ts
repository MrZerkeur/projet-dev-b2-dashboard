import { Site } from 'src/modules/sites/entity/site.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid', { name: 'image_id' })
  id: string;

  @Column('varchar', { name: 'name', length: 30, nullable: false })
  name: string;

  @Column('text', { name: 'path', nullable: false })
  path: string;

  @Column('varchar', { name: 'section_name', length: 50, nullable: false })
  sectionName: string;

  @ManyToOne(() => Site, (site) => site.images)
  @JoinColumn({ name: 'site_id' })
  site: Site;
}
