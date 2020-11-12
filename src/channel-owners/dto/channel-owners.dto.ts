
export class ChannelOwnersDto {
    public id?: number
    public UserId: number
    constructor(advertisingProviderDto: ChannelOwnersDto) {
        this.id = advertisingProviderDto.id
        this.UserId = advertisingProviderDto.UserId;
    }
}
