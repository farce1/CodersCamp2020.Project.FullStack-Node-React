import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';
import restaurantModel from '../models/restaurant.model';
import UserIsNotOwnerOfSelectedRestaurant from '../exceptions/UserIsNotOwnerOfSelectedRestaurant';

async function restaurantUpdateMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const userRole = request.user.userRole;
  const userId = request.user._id;
  const doesVeryfiedFieldExist = Object.keys(request.body).some(key => key === 'verified');
  const isPermission = () => userRole === 1 || userRole === 0;

  if (doesVeryfiedFieldExist) {
    const isConfirmed = isPermission();
    if (isConfirmed && userRole === 1) {
      const restaurant = restaurantModel;
      const selectedRestaurant = await restaurant.findOne({ 'owner._id': userId });
      if (selectedRestaurant) {
        const nameRequestedRestaurant = selectedRestaurant.name;
        selectedRestaurant.owner._id.toString() === userId.toString()
          ? next()
          : next(new UserIsNotOwnerOfSelectedRestaurant(userId, nameRequestedRestaurant));
      } else {
        next(new UserIsNotOwnerOfSelectedRestaurant(userId));
      }
    } else if (isConfirmed && userRole === 0) {
      next();
    } else {
      next(new UserDoesNotHavePermissionToExecutedRequestedData());
    }
  } else {
    next();
  }
}

export default restaurantUpdateMiddleware;
