import { IsEmail, IsString, Length } from 'class-validator';

export class AuthCredentialsDto {
    @IsString() @IsEmail() email: string;
    @IsString() @Length(6, 64) password: string;
}
