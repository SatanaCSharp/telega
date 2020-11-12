import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from '../users/interfaces/iuser';
import * as bcrypt from 'bcryptjs';
import { EUser } from '../users/enums/user.enum';


@Injectable() export class AuthValidatorService {
    public validatePassword = async (user: IUser, password: string): Promise<void> => {
        if (!user && !await bcrypt.compare(password, user.password)) {
            throw new HttpException('Credentials are incorrect!', HttpStatus.CONFLICT);
        }
    };

    public checkIfUserExists(user: Partial<IUser>): void  {
        const isUser: boolean = Boolean(user);
        if (!isUser) {
            throw new HttpException(`User does not exists!`, HttpStatus.CONFLICT);
        }
    }

    public checkIfUserAlreadySignedUp (user: Partial<IUser>, conflictPropertyName: string): void {
        const isUser: boolean = Boolean(user);
        if (isUser) {
            throw new HttpException(`User exists with the same ${conflictPropertyName}!`, HttpStatus.CONFLICT);
        }
    }

    public checkUserIfTypeValid(userType: string) {
        if (userType !== EUser.advertisingProvider && userType !== EUser.channelOwner) {
            throw new HttpException('User type specified incorrectly!', HttpStatus.CONFLICT);
        }
    }
}
