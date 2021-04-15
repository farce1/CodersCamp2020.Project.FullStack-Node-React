import HttpException from './HttpException';

class RestaurantIsNotonTheList extends HttpException {
  constructor(id?: string) {
    const idErrorMessage = `Restaurant with id ${id} isn't in favourites`;
    super(400, idErrorMessage);
  }
}

export default RestaurantIsNotonTheList;
