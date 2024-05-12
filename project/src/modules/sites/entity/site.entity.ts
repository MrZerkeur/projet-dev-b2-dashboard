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

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn('uuid', { name: 'site_id' })
  id: string;

  @Column('varchar', { name: 'name', length: 30, unique: true })
  name: string;

  @Column('varchar', { name: 'host', length: 15 })
  host: string;

  @Column('varchar', { name: 'port', length: 5 })
  port: string;

  @Column('varchar', { name: 'tcp_port', length: 5, unique: true })
  tcpPort: string;

  @ManyToMany(() => User, (user) => user.sites, { cascade: true })
  @JoinTable({
    name: 'sites_users',
    joinColumn: { name: 'site_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @OneToMany(() => Image, (image) => image.site, { cascade: true })
  images: Image[];

  @OneToMany(() => Text, (text) => text.site, { cascade: true })
  texts: Text[];
}
