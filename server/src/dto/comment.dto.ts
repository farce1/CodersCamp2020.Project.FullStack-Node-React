// @ts-ignore
import { IsString } from 'class-validator';

class CreateCommentDto {
    @IsString()
    public comment: string;
}

export default CreateCommentDto;