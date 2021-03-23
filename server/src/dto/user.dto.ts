// @ts-ignore
import { IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import CreateAddressDto from './address.dto';
import CreateCommentDto from './comment.dto';

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
  @ValidateNested()
  public address?: CreateAddressDto;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  public comments: [CreateCommentDto];
}

export default CreateUserDto;