import { IsBoolean, IsString, IsUrl, Length } from 'class-validator';

export class CreateAdvertisementsDto {
    @IsString() @Length(50, 5000) description: string;
    @IsBoolean() isPublished: boolean;
    @IsString() @IsUrl() image: string;
}
