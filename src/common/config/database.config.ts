import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { User } from '../../users/users.model';
import * as dotenv from 'dotenv';
import { ChannelOwner } from '../../channel-owners/channel-owners.model';
import { AdvertisingProvider } from '../../advertising-providers/advertising-providers.model';
dotenv.config();
export const mySqlConfig: SequelizeModuleOptions = {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User, ChannelOwner, AdvertisingProvider],
    logging: false
};
