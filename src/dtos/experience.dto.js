import {
  IsDateTimeString,
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
} from 'class-validator';
import 'reflect-metadata';

export class experienceDto {
  @IsString()
  id;

  @IsString()
  title;

  @IsString()
  privateTitle;

  @IsString()
  mainProfileId;

  @IsString()
  shortDescription;

  @IsString()
  longDescription;

  @IsString()
  catagory;

  @IsString()
  appWorkedDescription;

  @IsString()
  techDescriptions;

  @IsString()
  companyName;

  @IsString()
  companyWebsite;

  @IsString()
  companyLinkedIn;

  @IsString()
  skillsIds;

  @IsString()
  startingDate;

  @IsString()
  endingDate;

  thumbnail;

  @IsString()
  companytype;

  @IsString()
  // @IsIn(['static', 'dynamic', 'prototype'])
  contentNature;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;
}
