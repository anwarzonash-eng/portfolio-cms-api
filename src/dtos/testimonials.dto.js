import { IsIn, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';

export class testimonialsDto {
  @IsString()
  id;

  @IsString()
  main_profile_id;

  @IsString()
  review_text;

  @IsString()
  client_name;

  @IsString()
  client_designation;

  @IsString()
  client_company;

  @IsString()
  client_company_website;

  @IsOptional()
  portfolio_id;

  @IsString()
  display_order;

  @IsOptional()
  client_pic;

  @IsOptional()
  video;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;
}
