import { IsString, IsEmail, IsNotEmpty, Min, Max, IsBoolean, IsUrl, IsIn, IsInt, IsNotEqualTo  } from 'class-validator';
import 'reflect-metadata';


export class AddPhotoDto {

  


}

export class ListPhotosDto {

  @IsString()
  @IsNotEmpty()
  @IsIn(['all', 'by_user'])
  userType;

  @IsString()
  @IsNotEmpty()
  @IsIn(['by_recent_users', 'by_recent_photos'])
  sortingType;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  offSet;

}




