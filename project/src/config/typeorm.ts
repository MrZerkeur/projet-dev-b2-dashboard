import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Image } from 'src/modules/images/entity/image.entity';
import { Site } from 'src/modules/sites/entity/site.entity';
import { Text } from 'src/modules/texts/entity/text.entity';
import { User } from 'src/modules/users/entity/user.entity';

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
