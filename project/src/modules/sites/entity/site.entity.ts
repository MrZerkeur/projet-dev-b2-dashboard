import { Image } from 'src/modules/images/entity/image.entity';
import { Text } from 'src/modules/texts/entity/text.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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
