import {IsString, IsEmail, Transform, IsNotEmpty, Min, Max, IsBoolean, IsInt, IsUrl, IsOptional, ValidateIf, IsIn} from 'class-validator';
import 'reflect-metadata';


export  class CreateUserDto {
    // @IsString()
    // @IsNotEmpty()
    // name;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email;


    @IsString()
    @IsNotEmpty()
    userName;

    
    @IsString()
    password;

    // @IsString()
    // @IsNotEmpty()
    // @IsIn(['email', 'facebook', 'google','apple'])
    // userType;

    // @IsString()
    // @IsNotEmpty()
    // photograperType;

    // @IsInt()
    // @Min(1)
    // @Max(10)
    // @IsNotEmpty()
    // photoDesireRatio;

    // @IsString()
    // @IsNotEmpty()
    // genresList;

    // @IsString()
    // @IsNotEmpty()
    // cameraBrand;

    // @IsBoolean()
    // isEmailVerified;

    // @IsBoolean()
    // isProvidedDetailedInfo;

    // @IsBoolean()
    // isRegistered;

    // @IsString()
    // @ValidateIf(e => e.facebookLink !== '')
    // @IsUrl()
    // facebookLink;

    // @IsString()
    // @ValidateIf(e => e.twitterLink !== '')
    // @IsUrl()
    // twitterLink;

    // @IsString()
    // @ValidateIf(e => e.instagramLink !== '')
    // @IsUrl()
    // instagramLink;

    // @IsString()
    // @ValidateIf(e => e.website !== '')
    // @IsUrl()
    // @IsOptional()
    // website;

    // @IsString()
    // state;

    // @IsString()
    // country;

  }

export  class LogInUserDto {
    @IsString()
    @IsNotEmpty()
    emailOrUsername;

   
  
    @IsString()
    @IsNotEmpty()
    password;

  }

  export  class GetSingleUserByEmailDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email;

  }