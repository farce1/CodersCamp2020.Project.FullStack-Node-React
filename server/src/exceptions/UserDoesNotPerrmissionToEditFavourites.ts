import HttpException from './HttpException';

class UserDoesNotHavePermissionToEditThisFavourtie extends HttpException {
    constructor() {
        const idErrorMessage = `User does not have permission to edit this favourites`;
        super(403, idErrorMessage);
    }
}

export default UserDoesNotHavePermissionToEditThisFavourtie;