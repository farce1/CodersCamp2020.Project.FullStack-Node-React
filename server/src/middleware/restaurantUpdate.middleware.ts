import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';
import restaurantModel from '../models/restaurant.model';
import UserIsNotOwnerOfSelectedRestaurant from '../exceptions/UserIsNotOwnerOfSelectedRestaurant';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import RestaurantAlreadyExistsException from '../exceptions/RestaurantAlreadyExistsException';
import addressModel from '../models/address.model';

async function restaurantUpdateMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const restaurant = restaurantModel;
  const address = addressModel;

  const restaurantId = request.params.id;
  let selectedRestaurant = null;
  const userRole = request.user.userRole;
  const userId = request.user._id;

  const doesNameFieldExist = Object.keys(request.body).some(key => key === 'name');
  const doesEmailFieldExist = Object.keys(request.body).some(key => key === 'email');
  const doesAddressFieldExist = Object.keys(request.body).some(key => key === 'address');
  const doesOwnerFieldExist = Object.keys(request.body).some(key => key === 'owner');
  const doesDescriptionFieldExist = Object.keys(request.body).some(key => key === 'description');
  const doesVeryfiedFieldExist = Object.keys(request.body).some(key => key === 'verified');
  const isPermission = () => userRole === 1 || userRole === 0;
  const isConfirmed = isPermission();

  try {
    selectedRestaurant = await restaurant.findById(restaurantId);
    const ownerOfSelectedRestaurant = selectedRestaurant.owner !== null && selectedRestaurant.owner;
    const restaurantHaveOwner = selectedRestaurant.owner;
    const nameRequestedRestaurant = selectedRestaurant.name;

    const emailRequestedToUpdate = request.body.email;
    const addressRequestedToUpdate = request.body.address;

    let emailAlreadyExist = false;
    if(emailRequestedToUpdate){
      const exist =  await restaurant.find({ email: emailRequestedToUpdate });
      emailAlreadyExist= !!exist.length
    }
    let addressAlreadyExist = false;
    if (addressRequestedToUpdate) {
      const exist = await address.find({ street: addressRequestedToUpdate.street });
      addressAlreadyExist = !!exist.length;
    }

    if ((doesVeryfiedFieldExist || doesOwnerFieldExist) && !isConfirmed) {
      next(new UserDoesNotHavePermissionToExecutedRequestedData());
    }

    if (emailRequestedToUpdate && emailAlreadyExist) {
      next(new RestaurantAlreadyExistsException(emailRequestedToUpdate, 'email'));
    }

    if (addressRequestedToUpdate && addressAlreadyExist) {
      next(new RestaurantAlreadyExistsException(addressRequestedToUpdate.street, 'address'));
    }

    if (userRole === 0) {
      next();
    } else if (userRole === 1) {
      if (doesVeryfiedFieldExist || doesOwnerFieldExist) {
        ownerOfSelectedRestaurant.toString() === userId.toString()
          ? next()
          : next(new UserIsNotOwnerOfSelectedRestaurant(userId, nameRequestedRestaurant));
      }
      if (doesNameFieldExist || doesEmailFieldExist || doesAddressFieldExist || doesDescriptionFieldExist) {
        if (restaurantHaveOwner !== null) {
          ownerOfSelectedRestaurant.toString() === userId.toString()
            ? next()
            : next(new UserIsNotOwnerOfSelectedRestaurant(userId, nameRequestedRestaurant));
        } else {
          next();
        }
      }
    } else {
      if (doesNameFieldExist || doesEmailFieldExist || doesAddressFieldExist || doesDescriptionFieldExist) {
        if (restaurantHaveOwner !== null) {
          next(new UserIsNotOwnerOfSelectedRestaurant(userId, nameRequestedRestaurant));
        } else {
          return next();
        }
      }

      next();
    }
  } catch (error) {
    console.log(error);
    next(new RestaurantNotFoundException(restaurantId));
  }
}

export default restaurantUpdateMiddleware;
