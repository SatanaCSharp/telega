import { AuthCredentialsDto } from './auth-creadential.dto';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class AuthSignUpDto extends AuthCredentialsDto {
    @IsString() @Length(2, 200) firstName: string;
    @IsString() @Length(2, 200) lastName: string;
    @IsNumber() @Min(12) @Max(12) phone: number;
}
