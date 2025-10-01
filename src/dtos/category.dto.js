import { IsString, IsIn, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsString()
  id;

  @IsString()
  label;

  @IsString()
  title;

  @IsString()
  designation;

  @IsString()
  tagline;

  @IsString()
  intro;

  @IsString()
  mainIntro_heading;

  @IsString()
  intro_heading;

  @IsString()
  mainIntro;

  @IsString()
  @IsOptional()
  is_category_static;

  @IsString()
  short_description;

  // thumbnail;

  @IsString()
  companytype;

  experienceIntro;

  @IsString()
  @IsIn(['add', 'delete', 'update', 'list'])
  actionType;

  @IsString()
  main_profile_id;

  // @IsString()
  // skillsIds;
}

export class filteredListDto {
  @IsString()
  id;
}
