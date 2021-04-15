import HttpException from './HttpException';

class RestaurantAlreadyExistsException extends HttpException {
  constructor(param: string, type: string) {
    super(400, `Restaurant with ${type} ${param} already exists`);
  }
}

export default RestaurantAlreadyExistsException;
