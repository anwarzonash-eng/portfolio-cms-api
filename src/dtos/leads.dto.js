import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsBoolean,
  IsUrl,
  IsArray,
  IsIn,
  IsOptional,
} from 'class-validator';
import 'reflect-metadata';

export class AddLeadsDto {
  @IsString()
  @IsOptional()
  name;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email;

  @IsString()
  @IsOptional()
  message;

  @IsString()
  @IsIn(['subscribe', 'contact'])
  source_category;
}

export class updateLeadsStatusDto {
  @IsString()
  @IsNotEmpty()
  id;

  @IsString()
  @IsNotEmpty()
  status;
}

export class deleteLeadDto {
  @IsString()
  @IsNotEmpty()
  id;
}
