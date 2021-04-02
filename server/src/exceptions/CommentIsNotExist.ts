import HttpException from './HttpException';

class CommentIsNotExist extends HttpException {
    constructor() {
        const idErrorMessage = `There is no such comment`;
        super(400, idErrorMessage);
    }
}

export default CommentIsNotExist;