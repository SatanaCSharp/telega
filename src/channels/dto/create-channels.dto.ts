import { ChannelsDto } from './channels.dto';
import { IsDateString, IsInt, IsNumber, IsString, Length } from 'class-validator';

export class CreateChannelsDto extends ChannelsDto {
    @IsString() @Length(2, 225) title: string;
    @IsString() @Length(2, 5000) description: string;
    @IsInt() participantsCount: number;
    @IsDateString() date: Date;
    @IsInt() postsCount: number;
    @IsNumber() priceRate: number;
}
