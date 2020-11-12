import { AuthCredentialsDto } from './auth-creadential.dto';
import { IsPhoneNumber, IsString, Length } from 'class-validator';
import { EUser } from '../../users/enums/user.enum';

export class AuthSignUpDto extends AuthCredentialsDto {
    @IsString() @Length(2, 200) firstName: string;
    @IsString() @Length(2, 200) lastName: string;
    @IsPhoneNumber('UA') phone: string;
    @IsString() userType: EUser;
}
