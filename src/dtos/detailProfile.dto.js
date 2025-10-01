import {
  IsString,
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
  isString,
  IsOptional,
} from 'class-validator';
import 'reflect-metadata';

export class detailProfileDto {
  @IsString()
  id;

  @IsString()
  privateTitle;

  @IsString()
  mainProfileId;

  @IsOptional()
  video_attached;

  @IsString()
  designation;

  @IsString()
  tagLine;

  @IsString()
  skills;

  @IsOptional()
  skillsIds;

  @IsString()
  shortDescription;

  @IsOptional()
  experiencesIds;

  @IsOptional()
  portfoliosIds;

  @IsString()
  description;

  @IsString()
  category1Title;

  @IsString()
  category1Description;

  @IsString()
  category2Title;

  @IsString()
  category2Description;

  @IsBoolean()
  category2Status;

  @IsString()
  category3Title;

  @IsString()
  category3Description;

  @IsBoolean()
  category3Status;

  @IsBoolean()
  isDynamic;

  @IsOptional()
  is_pdf_generated;

  @IsOptional()
  services;

  @IsOptional()
  pdf_download_links;

  @IsString()
  companytype;

  @IsString()
  @IsIn(['static', 'dynamic', 'prototype'])
  contentNature;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;
}

export class duplicateDto {
  @IsString()
  id;

  @IsString()
  main_profile_id;
}

export class uploadCV {
  @IsString()
  id;
}
