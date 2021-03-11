import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from '../models/user.model';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserWithThatEmailAlreadyExistsException from 'exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from 'exceptions/WrongCredentialsException';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
    this.router.get(`${this.path}`, authMiddleware, this.getUsers);
    this.router.post(`${this.path}`, this.createUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteUser);
    this.router.patch(`${this.path}/:id`, authMiddleware, this.updateUser);
  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const userQuery = this.user.findById(id);
    const user = await userQuery;
    if (user) {
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  };

  private getUsers = async (request: Request, response: Response, next: NextFunction) => {
    const users = await this.user.find();
    if (users) {
      response.send(users);
    } else {
      next();
    }
  };

  private createUser = async (request: Request, response: Response, next: NextFunction) => {
    if (await this.user.findOne({ email: request.body.email })) {
      next(new UserWithThatEmailAlreadyExistsException(request.body.email));
    }
    const user = await this.user.create({
      ...request.body,
    });

    if (user) {
      response.send(user);
    } else {
      next();
    }
  };

  private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const user = await this.user.findById(id);
    if (user) {
      await this.user.findByIdAndDelete(id);
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  };

  private updateUser = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const user = await this.user.findById(id);
    if (user) {
      this.user.findByIdAndUpdate(id, { ...request.body }, (err, data) => {
        if (err) {
          next(new WrongCredentialsException());
        } else {
          response.send(data);
        }
      });
    } else {
      next(new UserNotFoundException(id));
    }
  };
}

export default UserController;
