import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';
import restaurantModel from '../models/restaurant.model';

async function restaurantDeleteMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const userRole = request.user.userRole;
  const restaurant = restaurantModel;
  const isPermission = () => userRole === 0 || userRole === 1;
  const isConfirmed = isPermission();
  if (isConfirmed) {
    if (userRole === 0) {
      next();
    }
    if (userRole === 1) {
      const findRestaurant = await restaurant.findById(request.params.id);
        console.log(findRestaurant);
      next();
    }
  } else {
    next(new UserDoesNotHavePermissionToExecutedRequestedData());
  }
}

export default restaurantDeleteMiddleware;
