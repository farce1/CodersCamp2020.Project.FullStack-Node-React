import { NextFunction, Response } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';

async function adminAuthMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const authenticatedUserRole = request.user.userRole;
  authenticatedUserRole === 0 ? next() : next(new UserDoesNotHavePermissionToExecutedRequestedData());
}

export default adminAuthMiddleware;
