import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import restaurantModel from '../models/restaurant.model';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';

async function userUpdateMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const authenticatedUser = String(request.user._id);
  const authenticatedUserRole = request.user.userRole;
  const doesUserRoleFieldExist = Object.keys(request.body).some(key => key === 'userRole');
  const doesBlockedFieldExist = Object.keys(request.body).some(key => key === 'blocked');
  const doesFavouritesFieldExist = Object.keys(request.body).some(key => key === 'favourites');
  const doesCommentsFieldExist = Object.keys(request.body).some(key => key === 'comments');

  if (doesFavouritesFieldExist || doesCommentsFieldExist)
    return next(new UserDoesNotHavePermissionToExecutedRequestedData());

  if (authenticatedUserRole === 0) {
    next();
  } else {
    if (doesUserRoleFieldExist) return next(new UserDoesNotHavePermissionToExecutedRequestedData());
    if (doesBlockedFieldExist) return next(new UserDoesNotHavePermissionToExecutedRequestedData());
    authenticatedUser === request.params.id ? next() : next(new UserDoesNotHavePermissionToExecutedRequestedData());
  }

  try {
  } catch (error) {
    console.log(error);
  }
}

export default userUpdateMiddleware;
