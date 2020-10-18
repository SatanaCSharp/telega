export class UserDto {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: number;
    constructor(user: UserDto) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone;
    }
}
