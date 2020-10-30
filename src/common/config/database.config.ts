import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { User } from '../../users/users.model';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('db.config > process.env.DB_HOST: ', process.env.DB_HOST)
export const mySqlConfig: SequelizeModuleOptions = {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User],
    logging: false
};
