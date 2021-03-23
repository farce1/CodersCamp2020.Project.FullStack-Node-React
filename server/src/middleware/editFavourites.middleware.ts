import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToEditThisFavourtie from '../exceptions/UserDoecNotPerrmissionToEditFavourites';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

async function favourtieEditMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  try {
    const favourieListtId = request.params.id;
    const userRole = request.user.userRole;
    const userId = request.user._id;
        if ( userRole === 2 && userId === favourieListtId) {
            next();
        } else {
            next(new UserDoesNotHavePermissionToEditThisFavourtie());
        }
    } catch {
        next (new NotAuthorizedException())
    }
  }

export default favourtieEditMiddleware;