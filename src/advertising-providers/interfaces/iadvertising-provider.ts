import { IUser } from '../../users/interfaces/iuser';

export interface IAdvertisingProvider {
    id?: number;
    UserId: number;
    user: IUser
}
