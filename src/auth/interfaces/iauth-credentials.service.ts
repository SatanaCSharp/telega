import { IBaseAuthService } from './ibase-auth.service';
import { AuthCredentialsDto } from '../dto/auth-creadential.dto';
import { AuthSignInDto } from '../dto/auth-sign-in.dto';

export interface IAuthCredentialsService extends IBaseAuthService<AuthCredentialsDto, AuthSignInDto> {}
