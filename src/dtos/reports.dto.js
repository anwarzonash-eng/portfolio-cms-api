import { IsString, IsDefined, IsEmail, IsNotEmpty, Min, Max, IsBoolean, IsUrl, IsIn, IsInt, IsNotEqualTo, ValidateIf, isNotEmpty } from 'class-validator';
import 'reflect-metadata';


export class reportsDto {

  @IsString()
  domain;

  @IsString()
  uniqueId;


  @IsString()
  @IsIn(['home', 'offer', 'cv', 'portfolio', 'portfolioById'])
  actionType;

}

export class listPortfolioDto{
  @IsInt()
  @IsNotEmpty()
  offSet;
}

export class portfolioByIdDto{
  @IsString()
  @IsNotEmpty()
  id;
}




