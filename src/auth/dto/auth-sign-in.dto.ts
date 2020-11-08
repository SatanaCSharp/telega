import { UserDto } from '../../users/dto/user.dto';

export class AuthSignInDto {
    user: Partial<UserDto>;
    accessToken: string;
}
