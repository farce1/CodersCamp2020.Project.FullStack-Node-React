import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import restaurantModel from '../models/restaurant.model';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import RestaurantAlreadyExistsException from '../exceptions/RestaurantAlreadyExistsException';
import addressModel from '../models/address.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateRestaurantDto from '../dto/restaurant.dto';

class RestaurantController implements Controller {
  public path = '/restaurants';
  public router = Router();
  private restaurant = restaurantModel;
  private address = addressModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getRestaurantById);
    this.router.get(`${this.path}`, this.getRestaurants);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateRestaurantDto), this.createRestaurant);
  }

  private createRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    if (await this.restaurant.findOne({ 'address.street': request.body.address.street })) {
      next(new RestaurantAlreadyExistsException(request.body.address.street, 'address'));
    }
    if (await this.restaurant.findOne({ email: request.body.email })) {
      next(new RestaurantAlreadyExistsException(request.body.email, 'email'));
    }
    const address = await this.address.create({
      ...request.body.address,
    });

    const restaurant = await this.restaurant.create({
      ...request.body,
      address,
    });

    if (restaurant) {
      response.send(restaurant);
    } else {
      next(new RestaurantNotFoundException());
    }
  };

  private getRestaurants = async (request: Request, response: Response, next: NextFunction) => {
    const restaurantQuery = this.restaurant.find();
    const restaurant = await restaurantQuery;
    if (restaurant) {
      response.send(restaurant);
    } else {
      next(new RestaurantNotFoundException());
    }
  };

  private getRestaurantById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const restaurantQuery = this.restaurant.findById(id);
    const restaurant = await restaurantQuery;
    if (restaurant) {
      response.send(restaurant);
    } else {
      next(new RestaurantNotFoundException(id));
    }
  };
}

export default RestaurantController;
