export interface IBaseAuthService<RequestDto, ResponceDto> {
    signIn(authCredentialDto: RequestDto): Promise<ResponceDto>;
    signUp(authCredentialDto: RequestDto): Promise<ResponceDto>;
}
