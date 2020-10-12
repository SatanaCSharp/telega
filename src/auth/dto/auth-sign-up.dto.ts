import { AuthCredentialsDto } from './auth-creadential.dto';
import { IsNumber, IsString } from 'class-validator';

export class AuthSignUpDto extends AuthCredentialsDto {
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsNumber() phone: number;
}
