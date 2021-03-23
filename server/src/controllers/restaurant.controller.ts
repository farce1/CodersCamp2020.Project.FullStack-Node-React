import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import restaurantModel from '../models/restaurant.model';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import addressModel from '../models/address.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateRestaurantDto from '../dto/restaurant.dto';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import restaurantCreateMiddleware from '../middleware/restaurantCreate.middleware';
import restaurantUpdateMiddleware from '../middleware/restaurantUpdate.middleware';
import restaurantDeleteMiddleware from '../middleware/restaurantDelete.middleware';
import * as _ from 'lodash';
import userModel from '../models/user.model';

class RestaurantController implements Controller {
  public path = '/restaurants';
  public router = Router();
  private restaurant = restaurantModel;
  private user = userModel;
  private address = addressModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.getRestaurants);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getRestaurantById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateRestaurantDto),
      restaurantCreateMiddleware,
      this.createRestaurant
    );
    this.router.patch(`${this.path}/:id`, authMiddleware, restaurantUpdateMiddleware, this.updateRestaurant);
    this.router.delete(`${this.path}/:id`, authMiddleware, restaurantDeleteMiddleware, this.deleteRestaurant);
  }

  private getRestaurants = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const restaurants = await this.restaurant.find().populate('address');
      restaurants ? response.send(restaurants) : next(new RestaurantNotFoundException());
    } catch {
      next(new RestaurantNotFoundException());
    }
  };

  private getRestaurantById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      const restaurant = await this.restaurant.findById(id).populate('address');
      restaurant ? response.send(restaurant) : next(new RestaurantNotFoundException(id));
    } catch {
      next(new RestaurantNotFoundException(id));
    }
  };

  addRestaurantToAddress(addressId: string, restaurantId: string) {
    return this.address.findByIdAndUpdate(addressId, { restaurant_id: restaurantId }, { new: true });
  }

  addAddressToRestaurant(restaurantId: string, addressId: string) {
    return this.restaurant.findByIdAndUpdate(restaurantId, { address: addressId }, { new: true });
  }

  addRestaurantToOwner(restaurantId: string, ownerId: string) {
    return this.user.findByIdAndUpdate(
      ownerId,
      { $push: { ownedRestaurants: restaurantId }, userRole: 1 },
      { new: true }
    );
  }

  removeRestaurantFromOwner(restaurantId: string, ownerId: string) {
    return this.user.findByIdAndUpdate(
      ownerId,
      { $pull: { ownedRestaurants: restaurantId }, userRole: 2 },
      { new: true }
    );
  }

  private createRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const address = await this.address.create({
        ...request.body.address,
      });

      const restaurant = await this.restaurant.create({
        ..._.omit(request.body, 'address'),
      });

      await this.addRestaurantToAddress(address._id, restaurant._id);
      await this.addRestaurantToOwner(restaurant._id, request.body.owner);
      const updatedRestaurant = await this.addAddressToRestaurant(restaurant._id, address._id)
        .populate('address')
        .populate({ path: 'owner', populate: { path: 'ownedRestaurants' } });
      updatedRestaurant ? response.send(updatedRestaurant) : next(new RestaurantNotFoundException());
    } catch (e) {
      next(new RestaurantNotFoundException());
    }
  };

  private updateRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const dataToUpdate = request.body;

    try {
      if (dataToUpdate.address) {
        const updatedRestaurant = await this.restaurant.findByIdAndUpdate(
          id,
          { ..._.omit(dataToUpdate, 'address') },
          { new: true }
        );

        await this.address.findByIdAndUpdate(
          updatedRestaurant.address,
          {
            ...dataToUpdate.address,
          },
          { new: true }
        );
        const updatedRestaurantWithAddress = await this.restaurant.findById(id).populate('address');
        response.send(updatedRestaurantWithAddress);
      } else {
        const restaurant = await this.restaurant
          .findByIdAndUpdate(id, { ...dataToUpdate }, { new: true })
          .populate('address');

        response.send({
          restaurant,
        });
      }
    } catch (e) {
      next(new RestaurantNotFoundException(id));
    }
  };

  private deleteRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      const restaurant = await this.restaurant.findByIdAndDelete(id);
      await this.address.findOneAndDelete({ restaurant_id: id });
      await this.removeRestaurantFromOwner(id, restaurant.owner);
      restaurant
        ? response.status(200).send(`Restaurant ${restaurant.name} successfully removed`)
        : next(new RestaurantNotFoundException(id));
    } catch {
      next(new RestaurantNotFoundException(id));
    }
  };
}

export default RestaurantController;
