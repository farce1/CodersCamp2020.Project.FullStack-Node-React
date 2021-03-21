import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from '../models/user.model';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import permissionMiddleware from '../middleware/permission.middleware';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';
import adminAuthMiddleware from '../middleware/adminAuthMiddleware.middleware';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, adminAuthMiddleware, this.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, adminAuthMiddleware, this.getUserById);
    this.router.patch(`${this.path}/:id`, authMiddleware, permissionMiddleware, this.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, permissionMiddleware, this.deleteUser);
  }

  private getUsers = async (request: Request, response: Response, next: NextFunction) => {
    const users = await this.user.find();
    users ? response.send(users) : next(new UserDoesNotHavePermissionToExecutedRequestedData());
  };

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.user.findById(id, (err, user) => {
        !err ? response.send(user) : next(new UserNotFoundException(id));
      });
    } catch {
      next(new WrongCredentialsException());
    }
  };

  private updateUser = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.user.findByIdAndUpdate(id, { ...request.body }, (err, data) => {
        !err ? response.send(data) : next(new UserNotFoundException(id));
      });
    } catch {
      next(new WrongCredentialsException());
    }
  };

  private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.user.findByIdAndDelete(id, { ...request.body }, (err, user) => {
        !err ? response.send(user) : next(new UserNotFoundException(id));
      });
    } catch {
      next(new WrongCredentialsException());
    }
  };
}

export default UserController;
