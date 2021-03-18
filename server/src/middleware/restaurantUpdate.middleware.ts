import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';
import restaurantModel from '../models/restaurant.model';
import UserIsNotOwnerOfSelectedRestaurant from '../exceptions/UserIsNotOwnerOfSelectedRestaurant';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';

async function restaurantUpdateMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const restaurant = restaurantModel;
  const restaurantId = request.params.id;
  let selectedRestaurant = null;
  const userRole = request.user.userRole;
  const userId = request.user._id;

  const doesVeryfiedFieldExist = Object.keys(request.body).some(key => key === 'verified');
  const isPermission = () => userRole === 1 || userRole === 0;
  const isConfirmed = isPermission();
  try {
    selectedRestaurant = await restaurant.findById(restaurantId);
    const ownerOfSelectedRestaurant = selectedRestaurant.owner !== null && selectedRestaurant.owner._id;
    const nameRequestedRestaurant = selectedRestaurant.name;

    if (doesVeryfiedFieldExist) {
      if (isConfirmed && userRole === 1) {
        ownerOfSelectedRestaurant.toString() === userId.toString()
            ? next()
            : next(new UserIsNotOwnerOfSelectedRestaurant(userId, nameRequestedRestaurant));
      } else if (isConfirmed && userRole === 0) {
        next();
      } else {
        next(new UserDoesNotHavePermissionToExecutedRequestedData());
      }
    } else {
      next();
    }
  } catch (error) {
    next(new RestaurantNotFoundException(restaurantId));
  }
}

export default restaurantUpdateMiddleware;
