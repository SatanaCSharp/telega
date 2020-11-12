import { UserDto } from '../../users/dto/user.dto';
import { EUser } from '../../users/enums/user.enum';

export class AuthSignInDto {
    user: Partial<UserDto>;
    accessToken: string;
    userType: EUser;
}
