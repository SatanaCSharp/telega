import { IUser } from '../../users/interfaces/iuser';

export interface IChannelOwner {
    id?: number;
    UserId: number;
    user: IUser
}
