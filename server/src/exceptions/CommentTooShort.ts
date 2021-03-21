import HttpException from './HttpException';

class CommentTooShort extends HttpException {
    constructor() {
        super(400, `The comment must have more than one letter`);
    }
}

export default CommentTooShort;