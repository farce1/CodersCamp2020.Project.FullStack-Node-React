import HttpException from './HttpException';

class UserIsNotOwnerOfSelectedRestaurant extends HttpException {
  constructor(id: string, nameRequestedRestaurant?: string) {
    nameRequestedRestaurant
      ? super(400, `User with id ${id} is not owner of requested ${nameRequestedRestaurant} restaurant.`)
      : super(400, `User with id ${id} is not owner of requested restaurant.`);
  }
}

export default UserIsNotOwnerOfSelectedRestaurant;
