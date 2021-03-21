import HttpException from './HttpException';

class CommentIsNotExist extends HttpException {
    constructor() {
        super(400, `There is no such comment`);
    }
}

export default CommentIsNotExist;