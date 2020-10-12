import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS_REPOSITORY } from '../common/constants/repositories.constants';
import { IUsersRepository } from '../users/interfaces/iusers.repository';
import * as bcrypt from 'bcryptjs';
import { USERS_MAPPER } from '../common/constants/mappers.constants';
import { IUsersMapper } from '../users/interfaces/iusers.mapper';
import { UserDto } from '../users/dto/user.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { IUser } from '../users/interfaces/iuser';
import { IAuthService } from './interfaces/iauth.service';

@Injectable()
export class AuthService  implements  IAuthService {
    constructor(
        @Inject(USERS_REPOSITORY) private usersRepository: IUsersRepository,
        @Inject(USERS_MAPPER) private usersMapper: IUsersMapper,
        private jwtService: JwtService
    ) {}

    private validateUser = async (user: IUser, password: string): Promise<void> => {
        if (!user && !await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Credentials are incorrect!');
        }
    };
    public signIn = async (authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> => {
        const user: IUser = await this.usersRepository.findByEmail(authCredentialDto.email);
        await this.validateUser(user, authCredentialDto.password);
        const userDto: UserDto = this.usersMapper.mapToDTO(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        return { user: userDto, accessToken };
    };

    signUp(authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> {
        return Promise.resolve(undefined);
    }
}
