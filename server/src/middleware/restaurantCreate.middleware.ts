import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import RestaurantAlreadyExistsException from '../exceptions/RestaurantAlreadyExistsException';
import restaurantModel from '../models/restaurant.model';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';

async function restaurantCreateMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const restaurant = restaurantModel;
  const userRole = request.user.userRole;

  const addressQuery = request.body.address.street;
  const addressAlreadyExist = await restaurant.findOne({ 'address.street': addressQuery });
  const emailQuery = request.body.email;
  const emailAlreadyExist = await restaurant.findOne({ email: emailQuery });
  const doesVeryfiedFieldExist = Object.keys(request.body).some(key => key === 'verified');

  if (addressAlreadyExist) {
    next(new RestaurantAlreadyExistsException(addressQuery, 'address'));
  }
  if (emailAlreadyExist) {
    next(new RestaurantAlreadyExistsException(emailQuery, 'email'));
  }

  if (doesVeryfiedFieldExist) {
    userRole === 0 ? next() : next(new UserDoesNotHavePermissionToExecutedRequestedData());
  }

  next();
}

export default restaurantCreateMiddleware;
