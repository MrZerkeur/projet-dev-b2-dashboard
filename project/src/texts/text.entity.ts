import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Site } from '../sites/site.entity';

@Entity()
export class Text {
  @PrimaryGeneratedColumn('uuid', { name: 'text_id' })
  id: string;

  @Column('text', { name: 'content', nullable: false })
  content: string;

  @Column('varchar', { name: 'section_name', length: 50, nullable: false })
  sectionName: string;

  @ManyToOne(() => Site, (site) => site.texts)
  site: Site;
}
