import { IsString, IsEmail, IsNotEmpty, IsIn } from 'class-validator';
import 'reflect-metadata';

export class AddDynamicGenerationDto {
  @IsString()
  description;

  @IsString()
  experience_variation1;

  @IsString()
  skillsIds;

  @IsString()
  companytype;

  @IsString()
  @IsIn(['add', 'update', 'list', 'delete'])
  actionType;

  @IsString()
  main_profile_id;
}
