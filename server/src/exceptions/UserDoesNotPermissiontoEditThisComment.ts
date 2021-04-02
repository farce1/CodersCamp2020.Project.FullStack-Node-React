import HttpException from './HttpException';

class UserDoesNotHavePermissionToEditThisComment extends HttpException {
    constructor() {
        const idErrorMessage = `User does not have permission to edit this comment`;
        super(403, idErrorMessage);
    }
}

export default UserDoesNotHavePermissionToEditThisComment;