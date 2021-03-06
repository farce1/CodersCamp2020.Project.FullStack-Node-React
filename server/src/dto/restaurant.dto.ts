// @ts-ignore
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import CreateAddressDto from './address.dto';
import { SiteDetails, Socials } from '../interfaces/restaurant.interface';

class CreateRestaurantDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @ValidateNested()
  public address: CreateAddressDto;

  @IsOptional()
  public owner: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public siteUrl: SiteDetails;

  @IsOptional()
  @IsBoolean()
  public opened: boolean;

  @IsOptional()
  @IsBoolean()
  public verified: boolean;

  @IsOptional()
  @IsArray()
  public cuisine: string[];

  @IsOptional()
  @IsArray()
  public socials: Socials;

  @IsOptional()
  @IsArray()
  public comments: string[];

  @IsOptional()
  @IsNumber()
  public likeCount: number;

  @IsOptional()
  @IsNumber()
  public dislikeCount: number;
}

export default CreateRestaurantDto;
