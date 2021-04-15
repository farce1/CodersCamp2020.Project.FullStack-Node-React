import HttpException from './HttpException';

class UserIsAlreadyOwnerOfSelectedRestaurant extends HttpException {
    constructor(id: string, nameRequestedRestaurant?: string) {
        nameRequestedRestaurant
            ? super(400, `User with id ${id} already is an owner of requested ${nameRequestedRestaurant} restaurant.`)
            : super(400, `User with id ${id} already is owner of requested restaurant.`);
    }
}

export default UserIsAlreadyOwnerOfSelectedRestaurant;
