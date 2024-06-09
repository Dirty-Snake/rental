import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categories/entities/category.entity';
import { Role } from '../roles/entities/role.entity';
import { History } from '../histories/entities/history.entity';

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    logging: true,
    logger: 'file',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    //migrationsRun: true,
    entities: [User, Equipment, Tag, Category, Role, History],
    synchronize: true,
    extra: {
      options: '-c timezone=Europe/Moscow',
    },
  }),
);
