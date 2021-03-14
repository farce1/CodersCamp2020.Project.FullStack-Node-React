import HttpException from './HttpException';

class RestaurantAlreadyInFavourites extends HttpException {
    constructor(id?: string) {
      const idErrorMessage = `Restaurant with id ${id} is already in favourites`;
      super(400, idErrorMessage);
    }
}

export default RestaurantAlreadyInFavourites;