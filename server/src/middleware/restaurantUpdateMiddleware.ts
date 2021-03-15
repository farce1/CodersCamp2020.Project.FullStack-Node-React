import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';

async function restaurantUpdateMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const userRole = request.user.userRole;
  const doesVeryfiedFieldExist = Object.keys(request.body).some(key => key === 'verified');
  const isPermission = () => userRole === 0 || userRole === 1;

  if (doesVeryfiedFieldExist) {
    const isConfirmed = isPermission();
    if (isConfirmed) {
      next();
    } else {
      next(new UserDoesNotHavePermissionToExecutedRequestedData());
    }
  } else {
    next();
  }
}

export default restaurantUpdateMiddleware;
