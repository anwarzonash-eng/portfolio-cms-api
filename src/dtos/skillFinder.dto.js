import { IsString } from 'class-validator';
import 'reflect-metadata';

export class skillFinderDto {
  @IsString()
  description;
}
