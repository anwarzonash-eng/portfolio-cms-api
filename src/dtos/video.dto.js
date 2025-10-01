import { IsString, IsIn } from 'class-validator';
import 'reflect-metadata';

export class VideoDto {
  @IsString()
  id;

  @IsString()
  title;

  @IsString()
  private_title;

  @IsString()
  main_profile_id;

  video;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;
}
