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
  const restaurantId = request.params.id;
  const address = addressModel;
  let selectedRestaurant = null;
  const userRole = request.user.userRole;
  const userId = request.user._id;

  const doesVeryfiedFieldExist = Object.keys(request.body).some(key => key === 'verified');
  const doesOwnerFieldExist = Object.keys(request.body).some(key => key === 'owner');
  const doesEmailFieldExist = Object.keys(request.body).some(key => key === 'email');
  const doesAddressFieldExist = Object.keys(request.body).some(key => key === 'address');
  const isPermission = () => userRole === 1 || userRole === 0;
  const isConfirmed = isPermission();

  try {
    selectedRestaurant = await restaurant.findById(restaurantId);
    const ownerOfSelectedRestaurant = selectedRestaurant.owner !== null && selectedRestaurant.owner;
    const nameRequestedRestaurant = selectedRestaurant.name;
    const addressIdOfRequestedRestaurant = selectedRestaurant.address;
    const emailRequestedToUpdate = request.body.email;
    const addressRequestedToUpdate = request.body.address;
    const emailAlreadyExist = await restaurant.find({ email: emailRequestedToUpdate });
    const addressAlreadyExist = await restaurant.find({ 'address.street': addressRequestedToUpdate.street });

    if (
      (doesVeryfiedFieldExist || doesOwnerFieldExist || doesEmailFieldExist || doesAddressFieldExist) &&
      !isConfirmed
    ) {
      next(new UserDoesNotHavePermissionToExecutedRequestedData());
    }

    if (emailAlreadyExist.length !== 0) {
      next(new RestaurantAlreadyExistsException(emailRequestedToUpdate, 'email'));
    }

    if (addressAlreadyExist.length !== 0) {
      next(new RestaurantAlreadyExistsException(addressRequestedToUpdate.street, 'address'));
    }

    if (userRole === 0) {
      next();
    } else if (userRole === 1) {
      if (doesVeryfiedFieldExist || doesOwnerFieldExist || doesEmailFieldExist || doesAddressFieldExist) {
        ownerOfSelectedRestaurant.toString() === userId.toString()
          ? next()
          : next(new UserIsNotOwnerOfSelectedRestaurant(userId, nameRequestedRestaurant));
      }
      // else if(doesAddressFieldExist){
      //   const addressToUpdate = await address.findById(addressIdOfRequestedRestaurant)
      // }
    } else {
      next();
    }
  } catch (error) {
    next(new RestaurantNotFoundException(restaurantId));
  }
}

export default restaurantUpdateMiddleware;
