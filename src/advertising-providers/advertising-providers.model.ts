import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IAdvertisingProvider } from './interfaces/iadvertising-provider';
import { User } from '../users/users.model';


@Table
export class AdvertisingProvider extends Model<AdvertisingProvider> implements IAdvertisingProvider {

    @ForeignKey(() => User)
    @Column UserId: number

    @BelongsTo(() => User)
    user: User;
}
