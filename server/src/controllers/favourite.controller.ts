import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import restaurantModel from '../models/restaurant.model';
import RestaurantAlreadyInFavourites from '../exceptions/RestaurantAlreadyInFavourites';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';

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
        this.router.post(`${this.path}`, this.addRestaurantToFavourites);
    }

    private addRestaurantToFavourites = async (request: Request, response: Response, next: NextFunction) => {
      const restaurantId = request.body.restaurantId;
      const restaurant = await this.restaurant.findById(restaurantId);
      if (!restaurant) {
        next(new RestaurantNotFoundException())
      }
      const user = await this.user.findById(request.body.userId);
      const favourites = user.get('favourites', null, {getters: false})
      if (favourites.includes(restaurantId)) {
          next(new RestaurantAlreadyInFavourites())
      } else {
        favourites.push(restaurantId);
        await user.save();
        response.send(200);
      }
    }

    private getFavourites = async (request: Request, response: Response, next: NextFunction) => {
      const userId = request.params.userId;
      const user = await this.user.findById(userId);
      const favouriteIds = user.get('favourites', null, {getters: false});
      const restaurants = await this.restaurant.find({"_id": {"$in": favouriteIds}})
      response.send(restaurants)
    };
}

export default FavouriteController;