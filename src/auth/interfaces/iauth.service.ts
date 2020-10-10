import { AuthCredentialsDto } from '../dto/auth-creadential.dto';
import { AuthSignInDto } from '../dto/auth-sign-in.dto';

export interface IAuthService {
    signIn(authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto>;
}
