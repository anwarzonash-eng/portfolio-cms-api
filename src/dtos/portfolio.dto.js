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
  IsOptional,
} from 'class-validator';
import 'reflect-metadata';

export class portfolioDto {
  @IsString()
  id;

  @IsString()
  title;
  @IsString()
  privateTitle;

  @IsString()
  mainProfileId;

  @IsString()
  tagline1;

  @IsString()
  tagline2;

  @IsString()
  featuresShort;

  @IsString()
  techShort;

  @IsString()
  display_order;

  @IsString()
  skillsIdsShorts;

  @IsString()
  categorys;

  @IsString()
  catagory;

  @IsString()
  featuresLong;

  @IsString()
  techLong;

  @IsString()
  skillsIdsLong;

  @IsString()
  link;

  thumbnail;

  @IsOptional()
  company_icon;

  @IsString()
  my_role;

  @IsString()
  services_i_provide;

  @IsString()
  client_name;

  @IsOptional()
  child_hero_banner;

  pictures;

  @IsString()
  startingDate;

  @IsString()
  endingDate;

  @IsString()
  companytype;

  @IsString()
  has_testimonial;

  @IsString()
  @IsOptional()
  is_for_cypexsoft;

  @IsString()
  @IsOptional()
  cypexsoft_category;

  @IsString()
  // @IsIn(['static', 'dynamic', 'prototype'])
  contentNature;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;
}


export class getPortfoliosByDetailProfileIdDto{
  @IsString()
  @IsNotEmpty()
  detailProfileId;

  @IsInt()
  @IsNotEmpty()
  offSet;

}
