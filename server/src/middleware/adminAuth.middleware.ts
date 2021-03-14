import { NextFunction, Response } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';

async function adminAuth(request: RequestWithUser, response: Response, next: NextFunction) {
  const authenticatedUserRole = request.user.userRole;
  authenticatedUserRole === 2 ? next() : next(new UserDoesNotHavePermissionToExecutedRequestedData());
}

export default adminAuth;
