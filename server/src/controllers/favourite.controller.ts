import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import restaurantModel from '../models/restaurant.model';
import RestaurantAlreadyInFavourites from '../exceptions/RestaurantAlreadyInFavourites';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import UserNotFoundException from '../exceptions/UserNotFoundException';

class FavouriteController implements Controller {
  public path = '/favourites';
  public router = Router();
  private restaurant = restaurantModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, this.getFavourites);
    this.router.put(`${this.path}/:userId`, this.addRestaurantToFavourites);
  }

  private addRestaurantToFavourites = async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      next(new UserNotFoundException(userId))
    }

    const user = await this.user.findById(userId);
    if (!user) {
      next(new UserNotFoundException(userId))
    }

    const restaurantId = request.body.restaurantId;
    if (!restaurantId.match(/^[0-9a-fA-F]{24}$/)) {
      next(new RestaurantNotFoundException(restaurantId));
    }

    const restaurant = await this.restaurant.findById(restaurantId);
    if (!restaurant) {
      next(new RestaurantNotFoundException(restaurantId));
    }

    const favourites = user.get('favourites', null, {getters: false})
    if (favourites.includes(restaurantId)) {
      next(new RestaurantAlreadyInFavourites(restaurantId));
    } else {
      favourites.push(restaurantId);
      await user.save();
      response.send(200);
    }
  }

  private getFavourites = async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    if (!userId) {
      next(new UserNotFoundException(userId))
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