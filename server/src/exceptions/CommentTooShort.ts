import HttpException from './HttpException';

class CommentTooShort extends HttpException {
    constructor() {
        const idErrorMessage = `The comment must have more than one letter`;
        super(400, idErrorMessage);
    }
}

export default CommentTooShort;