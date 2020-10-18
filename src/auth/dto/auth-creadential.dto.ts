import { IsEmail, IsString } from 'class-validator';

export class AuthCredentialsDto {
    @IsString() @IsEmail() email: string;

    @IsString() password: string;
}
