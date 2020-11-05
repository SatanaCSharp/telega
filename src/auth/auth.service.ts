import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersRepository } from '../users/interfaces/iusers.repository';
import * as bcrypt from 'bcryptjs';
import { IUsersMapper } from '../users/interfaces/iusers.mapper';
import { UserDto } from '../users/dto/user.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { IUser } from '../users/interfaces/iuser';
import { IAuthService } from './interfaces/iauth.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthValidatorService } from './auth-validator.service';
import { AUTH_VALIDATOR_SERVICE, USERS_MAPPER, USERS_REPOSITORY } from '../common/di.constants';

@Injectable() export class AuthService  implements  IAuthService {
    constructor(
        @Inject(USERS_REPOSITORY) private usersRepository: IUsersRepository,
        @Inject(USERS_MAPPER) private usersMapper: IUsersMapper,
        @Inject(AUTH_VALIDATOR_SERVICE) private authValidatorService: AuthValidatorService,
        private jwtService: JwtService
    ) {}
    public signIn = async (authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> => {
        const user: IUser = await this.usersRepository.findByEmail(authCredentialDto.email);
        await this.authValidatorService.validatePassword(user, authCredentialDto.password);
        const userDto: UserDto = this.usersMapper.mapToDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        return { user: userDto, accessToken };
    };

    public signUp = async (authCredentialDto: AuthSignUpDto): Promise<AuthSignInDto> => {
        const user: IUser = await this.usersRepository.findByEmail(authCredentialDto.email);
        this.authValidatorService.isUserExists(user);
        const SALT_LENGTH = 10;
        const salt = await bcrypt.genSalt(SALT_LENGTH);
        const password =  await bcrypt.hash(authCredentialDto.password, salt);
        const createdUser: IUser = await this.usersRepository.create({...authCredentialDto, password});
        const userDto: UserDto = this.usersMapper.mapToDto(createdUser);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        return { user: userDto, accessToken };
    }
}
