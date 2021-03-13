import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from '../models/user.model';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import permissionMiddleware from "../middleware/permission.middleware";

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
    this.router.patch(`${this.path}/:id`, authMiddleware ,permissionMiddleware, this.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteUser);
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

  private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const user = await this.user.findById(id);
    if (user) {
      // if(request.user._id.toString() !== id.toString()) {
      // 	next(new NotAuthorizedException())
      // }
      await this.user.findByIdAndDelete(id);
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  };

  private updateUser = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.user.findByIdAndUpdate(id, { ...request.body }, (err, data)=>{
        !err ? response.send(data) : next(new UserNotFoundException(id));
      })
    } catch{
      next(new WrongCredentialsException())
    }
  };
}

export default UserController;
