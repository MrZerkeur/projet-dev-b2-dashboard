import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Site } from '../sites/site.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column('varchar', { name: 'first_name', length: 30, nullable: false })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @Column('varchar', {
    name: 'email',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', { name: 'password_hash', length: 62, nullable: false })
  passwordHash: string;

  @Column('varchar', { name: 'salt', length: 15, nullable: false })
  salt: string;

  @ManyToMany(() => Site, (site) => site.users)
  sites: Site[];
}
