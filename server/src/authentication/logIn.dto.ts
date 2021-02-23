import { IsString } from 'controllers/user/controllers/post/class-validator';

class LogInDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default LogInDto;
