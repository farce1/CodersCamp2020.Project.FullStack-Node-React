import HttpException from './HttpException';

class RestaurantAlreadyInFavourites extends HttpException {
    constructor(id?: string) {
      const idErrorMessage = `The restaurant with id ${id} is already in favourites`;
      super(400, idErrorMessage);
    }
}

export default RestaurantAlreadyInFavourites;