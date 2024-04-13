import { Site } from 'src/modules/sites/entity/site.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('users')
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

  @Column('boolean', { name: 'is_admin', nullable: false })
  isAdmin: boolean;

  @ManyToMany(() => Site, (site) => site.users)
  sites: Site[];
}
