import { IsString, IsEmail, IsNotEmpty, Min, Max, IsBoolean, IsUrl, IsIn, IsInt, IsNotEqualTo, IsDefined, ValidateIf, IsNumber } from 'class-validator';
import 'reflect-metadata';


export class EducationDto {

  @IsString()
  id;

  @IsString()
  university_name;

@IsString()
  private_title;

  @IsString()
  mainProfileId;

  @IsString()
  university_website_link;

  @IsString()
  degree_name;

  @IsString()
  degree_description;

  @IsString()
  degree_start_date;

  @IsString()
  degree_end_date;
  
  thumbnail;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;


}





