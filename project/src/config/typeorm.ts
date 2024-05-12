import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Image } from 'src/modules/images/entity/image.entity';
import { Site } from 'src/modules/sites/entity/site.entity';
import { Text } from 'src/modules/texts/entity/text.entity';
import { User } from 'src/modules/users/entity/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Site, Image, Text],
  autoLoadEntities: true,
  synchronize: true, //! Remove for production
};
