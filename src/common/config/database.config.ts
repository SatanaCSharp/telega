import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../../users/users.model';


export const mySqlConfig: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1Swat741852963',
    database: 'ems',
    models: [User],
    logging: false
};
