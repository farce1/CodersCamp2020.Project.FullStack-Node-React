// @ts-ignore
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import CreateAddressDto from './address.dto';

class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsOptional()
  @IsNumber()
  public age: number;

  @IsOptional()
  @ValidateNested()
  public address?: CreateAddressDto;

  @IsOptional()
  @IsNumber()
  public userRole: number;

  @IsOptional()
  @IsString()
  public avatarUrl: string;

  @IsOptional()
  @IsBoolean()
  public blocked: boolean;

  @IsOptional()
  @IsArray()
  public ownedRestaurants: string[];

  @IsOptional()
  @IsArray()
  public favourites: string[];

  @IsOptional()
  @IsArray()
  public comments: string[];
}

export default CreateUserDto;
