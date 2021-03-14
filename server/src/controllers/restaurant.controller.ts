import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import restaurantModel from '../models/restaurant.model';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import addressModel from '../models/address.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateRestaurantDto from '../dto/restaurant.dto';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import restaurantValidation from '../middleware/restaurantValidation.middleware';

class RestaurantController implements Controller {
  public path = '/restaurants';
  public router = Router();
  private restaurant = restaurantModel;
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
      restaurantValidation,
      this.createRestaurant
    );
    this.router.patch(`${this.path}/:id`, authMiddleware, this.updateRestaurant);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteRestaurant);
  }

  private getRestaurants = async (request: Request, response: Response, next: NextFunction) => {
    const restaurants = await this.restaurant.find();
    restaurants ? response.send(restaurants) : next(new RestaurantNotFoundException());
  };

  private getRestaurantById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.restaurant.findById(id, (err, restaurant) => {
        !err ? response.send(restaurant) : next(new RestaurantNotFoundException(id));
      });
    } catch {
      next(new RestaurantNotFoundException(id));
    }
  };

  private createRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    const address = await this.address.create({
      ...request.body.address,
    });

    const restaurant = await this.restaurant.create({
      ...request.body,
      address,
    });

    restaurant ? response.send(restaurant) : next(new RestaurantNotFoundException());
  };

  private updateRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const restaurant = await this.restaurant.findById(id);
    if (restaurant) {
      this.restaurant.findByIdAndUpdate(id, { ...request.body }, (err, data) => {
        if (err) {
          next(new WrongCredentialsException());
        } else {
          response.send(data);
        }
      });
    } else {
      next(new RestaurantNotFoundException(id));
    }
  };

  private deleteRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const restaurant = await this.restaurant.findById(id);
    if (restaurant) {
      // if(request.user._id.toString() !== id.toString()) {
      // 	next(new NotAuthorizedException())
      // }
      await this.restaurant.findByIdAndDelete(id);
      response.send(restaurant);
    } else {
      next(new RestaurantNotFoundException(id));
    }
  };

}

export default RestaurantController;
