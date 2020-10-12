import { Column, Model, Table } from 'sequelize-typescript';
import { IUser } from './interfaces/iuser';

@Table
export class User extends Model<User> implements IUser {
    @Column firstName: string;
    @Column lastName: string;
    @Column email: string;
    @Column password: string;
    @Column phone: number;
}
