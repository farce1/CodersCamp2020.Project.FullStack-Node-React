import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import DataStoredInTokenInterface from '../interfaces/dataStoredInToken.interface';
import TokenData from '../interfaces/tokenData.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dto/user.dto';
import User from '../interfaces/user.interface';
import userModel from '../models/user.model';
import AuthenticationService from '../services/authentication.service';
import LogInDto from '../dto/logIn.dto';
import restaurantModel from '../models/restaurant.model';
import authMiddleware from '../middleware/auth.middleware';
import UpgradeRole from '../dto/roleUpgrade.dto';
import UserIsAlreadyOwnerOfSelectedRestaurant from '../exceptions/UserIsAlreadyOwnerOfSelectedRestaurant';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();
  private user = userModel;
  private restaurant = restaurantModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
    this.router.post(`${this.path}/logout`, this.loggingOut);
    this.router.patch(`${this.path}/roleRequest/:id`, authMiddleware, this.upgradeRole);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, user } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  };

  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.get('password', null, { getters: false })
      );
      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(tokenData);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  };

  addRestaurantToOwner(restaurantId: string, ownerId: string) {
    return this.user.findByIdAndUpdate(
      ownerId,
      { $push: { ownedRestaurants: restaurantId }, userRole: 1 },
      { new: true }
    );
  }

  private upgradeRole = async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    const roleUpgrade = request.body.userRole;
    const restaurantId = request.body.restaurantId;

    try {
      const rest = await this.restaurant.findById(restaurantId);
      if ('' + rest.owner !== userId) {
        const userData = await this.addRestaurantToOwner(restaurantId, userId);

        if (+roleUpgrade === 1) {
          const restaurant = await this.restaurant
            .findByIdAndUpdate(
              restaurantId,
              {
                owner: userId,
              },
              { new: true }
            )
            .populate('address', '-__v')
            .populate('owner', '-__v')
            .populate({ path: 'owner', populate: { path: 'ownedRestaurants' } });

          return response.send({
            restaurant,
          });
        }

        return response.send({
          user: userData,
        });
      } else {
        next(new UserIsAlreadyOwnerOfSelectedRestaurant(userId));
      }
    } catch (e) {
      console.log('cath', e);
      next(new WrongCredentialsException());
    }
  };

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; Path=/; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInTokenInterface = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationController;
