import {
  IsString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsBoolean,
  IsUrl,
  IsIn,
  IsInt,
  IsNotEqualTo,
  ValidateIf,
  isNotEmpty,
  IsOptional,
} from 'class-validator';
import 'reflect-metadata';
import { isFloat64Array } from 'util/types';

export class mainProfileDto {
  @IsString()
  id;

  @IsString()
  domain;

  @IsString()
  name;

  @IsString()
  homePageTagline;

  @IsString()
  email;

  @IsString()
  linkedIn;

  @IsString()
  facebook;

  @IsString()
  twitter;

  @IsString()
  instagram;

  @IsString()
  upwork;

  hourly_rate;

  @IsString()
  github;
  @IsString()
  phone_no;

  @IsString()
  location;

  @IsString()
  companytype;

  @IsString()
  no_of_experiences;

  @IsString()
  projects_completed;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;

  @IsDefined()
  profile_photo_1;

  @IsDefined()
  profile_photo_2;

  @IsOptional()
  profile_photo_3;

  @IsString()
  behance_link;

  @IsString()
  color1;

  @IsString()
  color2;

  @IsString()
  color3;

  @IsString()
  color4;

  @IsString()
  primary_color;

  @IsString()
  page_bg_color;

  @IsString()
  banner_bg_color;

  @IsString()
  section_bg_color;

  @IsString()
  heading_color;

  @IsString()
  paragrapgh1_color;

  @IsString()
  paragrapgh2_color;

  @IsString()
  border_color;

  // @IsOptional()
  // video;

  @IsOptional()
  calendly_link;

  @IsString()
  googleAnalyticsScript;
}
