import { UserDto } from '../../users/dto/user.dto';

export class AuthSignInDto {
    user: UserDto;
    accessToken: string;
}
