
export class AdvertisingProvidersDto {
    public id?: number
    public UserId: number
    constructor(advertisingProviderDto: AdvertisingProvidersDto) {
        this.id = advertisingProviderDto.id
        this.UserId = advertisingProviderDto.UserId;
    }
}
