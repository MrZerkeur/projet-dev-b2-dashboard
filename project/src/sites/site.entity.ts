import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Image } from '../images/image.entity';
import { Text } from '../texts/text.entity';

@Entity()
export class Site {
  @PrimaryGeneratedColumn('uuid', { name: 'site_id' })
  id: string;

  @Column('varchar', { name: 'name', length: 30, unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.sites)
  @JoinTable()
  users: User[];

  @OneToMany(() => Image, (image) => image.site)
  images: Image[];

  @OneToMany(() => Text, (text) => text.site)
  texts: Text[];
}
