import { IsBoolean, IsString, IsUrl, Length } from 'class-validator';
import { AdvertisementsDto } from './advertisements.dto';

export class CreateAdvertisementsDto extends AdvertisementsDto {
    @IsString() @Length(50, 5000) description: string;
    @IsBoolean() isPublished: boolean;
    @IsString() @IsUrl() image: string;
}
