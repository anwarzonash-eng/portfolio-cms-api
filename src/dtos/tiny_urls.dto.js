import {IsString, IsNotEmpty} from 'class-validator';
import 'reflect-metadata';

export class generateTinyUrlDto{
    @IsString()
    @IsNotEmpty()
    detailProfileId;
}

export class getTinyUrlDetailDto{
    @IsString()
    @IsNotEmpty()
    uniqueId;
}