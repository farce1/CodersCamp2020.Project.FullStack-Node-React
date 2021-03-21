// @ts-ignore
import { IsNumber, IsOptional, IsString } from 'class-validator';

class UpgradeRole {
  @IsNumber()
  public userRole: number;

  @IsString()
  @IsOptional()
  public restaurantId: string;
}

export default UpgradeRole;
