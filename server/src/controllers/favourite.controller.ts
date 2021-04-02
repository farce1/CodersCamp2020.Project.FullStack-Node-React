import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import restaurantModel from '../models/restaurant.model';
import RestaurantAlreadyInFavourites from '../exceptions/RestaurantAlreadyInFavourites';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import RestaurantIsNotonTheList from '../exceptions/RestaurantIsNotOnTheList';
import permissionMiddleware from '../middleware/permission.middleware';
import authMiddleware from '../middleware/auth.middleware';
import { Operation } from '../constans/index';
import favouriteEditMiddleware from '../middleware/editFavourites.middleware';

class FavouriteController implements Controller {
  public path = '/favourites';
  public router = Router();
  private restaurant = restaurantModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, authMiddleware, this.getFavourites);
    this.router.put(`${this.path}/:userId`, authMiddleware, favouriteEditMiddleware, this.addOrRemoveRestaurantToFavourites);
  }

  private addOrRemoveRestaurantToFavourites = async (request: Request, response: Response, next: NextFunction) => {
    const userId: string = request.params.userId;
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      next(new UserNotFoundException(userId));
    }

    const user = await this.user.findById(userId);
    if (!user) {
      next(new UserNotFoundException(userId));
    }

    const restaurantId: string = request.body.restaurantId;
    if (!restaurantId.match(/^[0-9a-fA-F]{24}$/)) {
      next(new RestaurantNotFoundException(restaurantId));
    }

    const restaurant = await this.restaurant.findById(restaurantId);
    if (!restaurant) {
      next(new RestaurantNotFoundException(restaurantId));
    }

    const favourites = user.get('favourites', null, {getters: false});
    const operation: string = request.body.operation;

    if (operation === Operation.Add) {
      if (favourites.includes(restaurantId)) {
      next(new RestaurantAlreadyInFavourites(restaurantId));
      } else {
        favourites.push(restaurantId);
        await user.save();
        response.send(restaurant);
      }
    }
    if (operation === Operation.Remove) {
      if (!favourites.includes(restaurantId)) {
        next(new RestaurantIsNotonTheList(restaurantId));
      } else {
        const index = favourites.findIndex((favourite: { _id: string; }) => favourite._id === restaurantId);
        favourites.splice(index, 1);
        await user.save();
        response.send(`The restaurant with id ${restaurantId} has been removed from favourites`);
      }
    }
  }

  private getFavourites = async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    if (!userId) {
      next(new UserNotFoundException(userId));
    }
    try {
    const user = await this.user.findById(userId);
    const favouriteIds = user.get('favourites', null, {getters: false});
    const restaurants = await this.restaurant.find({"_id": {"$in": favouriteIds}});
    response.send(restaurants);
    } catch (error) {
      next(new UserNotFoundException(userId));
    }
  }
}

export default FavouriteController;