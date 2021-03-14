import { NextFunction, Response } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';

async function permissionMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const authenticatedUser = String(request.user._id);
  const authenticatedUserRole = request.user.userRole;
  if (authenticatedUserRole === 0) {
    next();
  } else {
    authenticatedUser === request.params.id ? next() : next(new UserDoesNotHavePermissionToExecutedRequestedData());
  }
}

export default permissionMiddleware;
