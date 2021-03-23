import HttpException from './HttpException';

class UserDoesNotHavePermissionToDeleteThisComment extends HttpException {
    constructor() {
        const idErrorMessage = `User does not have permission to delete this comment`;
        super(403, idErrorMessage);
    }
}

export default UserDoesNotHavePermissionToDeleteThisComment;