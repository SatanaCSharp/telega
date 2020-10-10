import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends BaseUserDto {
    public password: string;
    public salary: number;
    public RoleId: number;
}
