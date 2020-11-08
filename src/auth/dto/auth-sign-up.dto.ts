import { AuthCredentialsDto } from './auth-creadential.dto';
import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class AuthSignUpDto extends AuthCredentialsDto {
    @IsString() @Length(2, 200) firstName: string;
    @IsString() @Length(2, 200) lastName: string;
    @IsPhoneNumber('UA') phone: string;
}
