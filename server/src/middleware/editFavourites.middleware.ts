import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToEditThisFavourtie from '../exceptions/UserDoesNotPerrmissionToEditFavourites';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';

async function favouriteEditMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  try {
    const userFavourites = request.params.userId;
    const userId = request.user._id;
        if ( userId.toString() !== userFavourites.toString() ) {
          next (new UserDoesNotHavePermissionToEditThisFavourtie());
        } else {
          next();
        }
    } catch {
        next (new NotAuthorizedException())
    }
  }

export default favouriteEditMiddleware;