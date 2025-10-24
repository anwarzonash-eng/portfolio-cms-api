import {
  IsString,
  IsUrl,
  IsIn,
  ValidateIf,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsObject,
  isString,
} from 'class-validator';
import 'reflect-metadata';

export class SkillsDto {
  @IsString()
  id;

  @IsString()
  title;

  @IsString()
  @ValidateIf((e) => e.url !== '')
  @IsUrl()
  url;

  @IsString()
  description;

  variation;

  @IsString()
  skillsIds;

  @IsString()
  catagory;

  @IsString()
  order;

  @IsOptional()
  icon;

  @IsOptional()
  @IsString()
  is_techstack;

  @IsOptional()
  @IsString()
  is_file_changed;


  // @IsString()
  // companytype;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;
}
