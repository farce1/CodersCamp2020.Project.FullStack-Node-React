import HttpException from './HttpException';

class RestaurantAlreadyInFavourites extends HttpException {
    constructor(id?: string) {
      const idErrorMessage = `Restaurant with this id is already in favourites`;
      super(400, idErrorMessage);
    }
}

export default RestaurantAlreadyInFavourites;