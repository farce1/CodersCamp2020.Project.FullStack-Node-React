import HttpException from './HttpException';

class UserDoesNotHavePermissionToExecutedRequestedData extends HttpException {
    constructor() {
        const idErrorMessage = `User does not have permission to executed requested data`;
        super(403, idErrorMessage);
    }
}

export default UserDoesNotHavePermissionToExecutedRequestedData;
