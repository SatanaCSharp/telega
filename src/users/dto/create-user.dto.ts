import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
    public password: string;
    public salary: number;
}
