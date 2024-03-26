import { User } from '../users/user.entity';
import { Site } from '../sites/site.entity';
import { Image } from '../images/image.entity';
import { Text } from '../texts/text.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'maria-woman',
  password: 'oui',
  database: 'db_projet_dev',
  entities: [User, Site, Image, Text],
  autoLoadEntities: true,
  synchronize: true, //! Remove for production
};
