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
      restaurantCreateMiddleware,
      this.createRestaurant
    );
    this.router.patch(`${this.path}/:id`, authMiddleware, restaurantUpdateMiddleware, this.updateRestaurant);
    this.router.delete(`${this.path}/:id`, authMiddleware, restaurantDeleteMiddleware, this.deleteRestaurant);
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
    const dataToUpdate = request.body;
    try {
      console.log('1');

      // const restaurantData = await this.restaurant.findByIdAndUpdate(id, { ...dataToUpdate }, { new: true });
      if (dataToUpdate.address) {
        const restaurantData = await this.restaurant.findById(id);
        console.log('2222', restaurantData);
        const addressToUpdate = this.address.findByIdAndUpdate(
          restaurantData.address._id,
          {
            street: dataToUpdate.address.street,
            city: dataToUpdate.address.city,
            country: dataToUpdate.address.country,
          },
          { new: true }
        );
        const restaurantToUpdate = await this.restaurant.findByIdAndUpdate(id, { ...dataToUpdate }, { new: true });
        console.log('2', restaurantData, addressToUpdate);
        response.send({
          restaurant: restaurantToUpdate,
          address: addressToUpdate,
        });
      } else {
        const restaurantToUpdate = await this.restaurant.findByIdAndUpdate(id, { ...dataToUpdate }, { new: true });
        console.log('3');
        response.send({
          restaurantToUpdate,
        });
      }
      //  !err ? response.send({restaurant: updatedRestaurant, address: addressToUpdate }) : console.log('blad');
    } catch (e) {
      next(new RestaurantNotFoundException(id));
    }
  };

  private deleteRestaurant = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.restaurant.findByIdAndDelete(id, { ...request.body }, (err, restaurant) => {
        !err ? response.send(restaurant) : next(new RestaurantNotFoundException(id));
      });
    } catch {
      next(new WrongCredentialsException());
    }
  };
}

export default RestaurantController;
