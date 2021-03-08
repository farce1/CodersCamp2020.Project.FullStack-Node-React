// @ts-ignore
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import CreateAddressDto from './address.dto';

class CreateRestaurantDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public siteUrl: string;

  @IsOptional()
  @IsBoolean()
  public opened: boolean;

  @IsOptional()
  @IsBoolean()
  public verified: boolean;

  @IsOptional()
  @IsArray()
  public cuisine: [];

  @IsOptional()
  @IsArray()
  public socials: [];

  @IsOptional()
  @IsArray()
  public comments: [];

  @IsOptional()
  @IsNumber()
  public likeCount: number;

  @IsOptional()
  @IsNumber()
  public dislikeCount: number;

  @ValidateNested()
  public address: CreateAddressDto;
}

export default CreateRestaurantDto;
