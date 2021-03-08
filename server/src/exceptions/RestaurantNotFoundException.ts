import HttpException from './HttpException';

class RestaurantNotFoundException extends HttpException {
  constructor(id?: string) {
    const idErrorMessage = `Restaurant with id ${id} not found`;
    const noneFoundErrorMessage = `No restaurants found`;
    super(404, id ? idErrorMessage : noneFoundErrorMessage);
  }
}

export default RestaurantNotFoundException;
