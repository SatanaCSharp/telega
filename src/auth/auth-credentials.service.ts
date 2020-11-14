import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../users/dto/user.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { IUser } from '../users/interfaces/iuser';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthValidatorService } from './auth-validator.service';
import { EUser } from '../users/enums/user.enum';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';

@Injectable() export class AuthCredentialsService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(AdvertisingProvider) private advertisingProviderModel: typeof AdvertisingProvider,
        @InjectModel(ChannelOwner) private channelOwnerModel: typeof ChannelOwner,
        @Inject(AuthValidatorService) private authValidatorService: AuthValidatorService,
        private jwtService: JwtService
    ) {}
    public signIn = async (authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> => {
        const user: IUser = await this.userModel.findOne({where: {email: authCredentialDto.email}});
        await this.authValidatorService.validatePassword(user, authCredentialDto.password);
        const userDto: UserDto = new UserDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        const userType: EUser = await this.getUserTypeByUserId(userDto.id);
        return { user: userDto, accessToken, userType };
    };

    public signUp = async (authCredentialDto: AuthSignUpDto): Promise<AuthSignInDto> => {
        const CONFLICT_PROPERTY_EMAIL = 'email';
        const CONFLICT_PROPERTY_PHONE = 'phone';
        this.authValidatorService.checkUserIfTypeValid(authCredentialDto.userType);
        const telegramUser: Partial<IUser> = await this.userModel.findOne({ where: { phone: authCredentialDto.phone } });
        this.authValidatorService.checkIfUserAlreadySignedUp(telegramUser, CONFLICT_PROPERTY_PHONE);
        const user: IUser = await this.userModel.findOne({where: {email: authCredentialDto.email}});
        this.authValidatorService.checkIfUserAlreadySignedUp(user, CONFLICT_PROPERTY_EMAIL);
        const SALT_LENGTH = 10;
        const salt = await bcrypt.genSalt(SALT_LENGTH);
        const password =  await bcrypt.hash(authCredentialDto.password, salt);
        const createdUser: IUser = await this.userModel.create({...authCredentialDto, password});
        const userDto: UserDto = new UserDto(createdUser);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        const userType: EUser = await this.createAdvertisingProviderOrChannelOwner(userDto.id, authCredentialDto.userType);
        return { user: userDto, accessToken, userType };
    }

    private createAdvertisingProviderOrChannelOwner = async (UserId: number, userType: string): Promise<EUser> => {
        if (userType === EUser.advertisingProvider) {
            await this.advertisingProviderModel.create({UserId});
            return EUser.advertisingProvider;
        }
        await this.channelOwnerModel.create({UserId});
        return EUser.channelOwner;
    }

    private getUserTypeByUserId = async (UserId): Promise<EUser> => {
        const advertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        if (advertisingProvider) {
            return EUser.advertisingProvider;
        }
        const channelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
        if (!channelOwner) {
            throw new HttpException('User has no type!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return  EUser.channelOwner;
    }
}
