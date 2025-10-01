import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import 'reflect-metadata';

export class dynamicDetailProfiledto {
  @IsNotEmpty()
  skills;

  @IsNotEmpty()
  intro_category_id;

  @IsNotEmpty()
  designation;

  @IsNotEmpty()
  experience_in_years;

  @IsNotEmpty()
  tag_line;

  @IsNotEmpty()
  domain;


  
}
