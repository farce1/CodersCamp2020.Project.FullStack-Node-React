import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import RestaurantAlreadyExistsException from '../exceptions/RestaurantAlreadyExistsException';
import restaurantModel from '../models/restaurant.model';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';
import addressModel from '../models/address.model';

async function restaurantCreateMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const restaurant = restaurantModel;
  const address = addressModel;
  const userRole = request.user.userRole;

  const addressQuery = request.body.address.street;
  const addressAlreadyExist = await address.findOne({ street: addressQuery });

  const emailQuery = request.body.email;
  const emailAlreadyExist = await restaurant.findOne({ email: emailQuery });

  const doesVeryfiedFieldExist = Object.keys(request.body).some(key => key === 'verified');
  const doesOwnerFieldExist = Object.keys(request.body).some(key => key === 'owner');
  const doesCommentsFieldExist = Object.keys(request.body).some(key => key === 'comments');
  const doesLikeCountFieldExist = Object.keys(request.body).some(key => key === 'likeCount');
  const doesDislikeCountFieldExist = Object.keys(request.body).some(key => key === 'dislikeCount');

  if (addressAlreadyExist) {
    return next(new RestaurantAlreadyExistsException(addressQuery, 'address'));
  }
  if (emailAlreadyExist) {
    return next(new RestaurantAlreadyExistsException(emailQuery, 'email'));
  }

  if (doesVeryfiedFieldExist) {
    return userRole === 0 ? next() : next(new UserDoesNotHavePermissionToExecutedRequestedData());
  }

  if (doesOwnerFieldExist) {
    return userRole === 0 ? next() : next(new UserDoesNotHavePermissionToExecutedRequestedData());
  }

  if (doesCommentsFieldExist || doesLikeCountFieldExist || doesDislikeCountFieldExist) {
    return next(new UserDoesNotHavePermissionToExecutedRequestedData());
  }

  next();
}

export default restaurantCreateMiddleware;
