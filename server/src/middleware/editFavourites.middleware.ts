import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToEditThisFavourtie from '../exceptions/UserDoecNotPerrmissionToEditFavourites';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

async function favourtieEditMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  try {
    const favourieListtId = request.params.userId;
    const userId = request.user._id;
        if ( userId.toString() !== favourieListtId.toString() ) {
          next (new UserDoesNotHavePermissionToEditThisFavourtie());
        } else {
          next();
        }
    } catch {
        next (new NotAuthorizedException())
    }
  }

export default favourtieEditMiddleware;