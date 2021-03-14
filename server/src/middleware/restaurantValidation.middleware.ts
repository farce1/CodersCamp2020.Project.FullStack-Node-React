import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import RestaurantAlreadyExistsException from '../exceptions/RestaurantAlreadyExistsException';
import restaurantModel from '../models/restaurant.model';

async function restaurantValidation(request: RequestWithUser, response: Response, next: NextFunction) {
  const restaurant = restaurantModel;

  const addressQuery = request.body.address.street;
  const addressAlreadyExist = await restaurant.findOne({ 'address.street': addressQuery });
  const emailQuery = request.body.email;
  const emailAlreadyExist = await restaurant.findOne({ email: emailQuery });

  if (addressAlreadyExist) {
    next(new RestaurantAlreadyExistsException(addressQuery, 'address'));
  }
  if (emailAlreadyExist) {
    next(new RestaurantAlreadyExistsException(emailQuery, 'email'));
  }

  next();
}

export default restaurantValidation;
