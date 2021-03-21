import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import restaurantModel from '../models/restaurant.model';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import addressModel from '../models/address.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateRestaurantDto from '../dto/restaurant.dto';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
// import restaurantUpdateMiddleware from '../middleware/restaurantUpdateMiddleware';
// import restaurantDeleteMiddleware from '../middleware/restaurantDeleteMiddleware';
// import restaurantCreateMiddleware from '../middleware/restaurantCreateMiddleware.middleware';
import commentsModel from '../models/comments.model';
import CreateCommentDto from '../dto/comment.dto';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import userModel from '../models/user.model';
import RequestWithUser from '../interfaces/requestWithUser.interface';

class CommentsController implements Controller {
  public path = '/comments';
  public router = Router();
  private restaurant = restaurantModel;
  private comment = commentsModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getComments);
    this.router.get(`${this.path}/:id`, this.getCommentsById);
    this.router.put(
      `${this.path}/:restaurantId`,
      authMiddleware,
      validationMiddleware(CreateCommentDto),
    //   restaurantCreateMiddleware,
      this.createComment
    );
    // this.router.patch(`${this.path}/:id`, this.updateRestaurant);
    this.router.delete(`${this.path}/:id`, this.deleteComment);
  }

  private getComments = async (request: Request, response: Response, next: NextFunction) => {
    const comments = await this.comment.find();
    comments ? response.send(comments) : next(new RestaurantNotFoundException());
  //  error do zmiany, czy to jest potrzebne ogólnie ta funkcja?
  //  dodać .populate('author', '-password');?
  //  https://github.com/mwanago/express-typescript/blob/part-5/src/post/post.controller.ts
  };

  private getCommentsById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.comment.findById(id, (err, comment) => {
        !err ? response.send(comment) : next(new RestaurantNotFoundException(id));
      });
    } catch {
      next(new RestaurantNotFoundException(id));
    }
  //  zmienić error
  };

  private createComment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        // const userId: string = request.userId; permissionMiddleware middlewar

        // const userId: string = String(request.user._id)
        // if (!userId) {
        // next(new UserNotFoundException(userId));
        // }

        // const user = await this.user.findById(userId);
        // if (!user) {
        // next(new UserNotFoundException(userId));
        const restaurantId: string = request.params.restaurantId;
        if (!restaurantId) {
        next(new RestaurantNotFoundException(restaurantId));
        }

        const restaurant = await this.restaurant.findById(restaurantId);
        if (!restaurant) {
        next(new RestaurantNotFoundException(restaurantId));
        }
        const user = await this.user.findById(request.user._id);
        const postComment: CreateCommentDto = request.body;
        const createdComment = await this.comment.create({
          timeStamp: Date.now(),
          ...postComment,
          user: [request.user._id],
          restaurant: [request.params.restaurantId],
        });
        // await savedComment.populate('restaurant','name').execPopulate();
        // await savedComment.populate('user','firstName').execPopulate();
        // await savedComment.populate('user','lastName').execPopulate();
        const restaurantsComments = restaurant.get('comments', null, {getters: false});
        const userComments = user.get('comments', null, {getters: false});
        userComments.push(createdComment);
        restaurantsComments.push(createdComment);

        // user.comments = [...user.comments, createdComment._id];
        await user.save();
        await restaurant.save();
        const savedComment = await createdComment.save();
        // await savedComment.populate('restaurant','name').execPopulate();
        // await savedComment.populate('user', 'lastName').execPopulate();
        response.send(savedComment);

        // const restaurantsComments = restaurant.get('comments', null, {getters: false});
        // const userComments = user.get('comments', null, {getters: false});
        // restaurantsComments.push(comment);
        // userComments.push(comment);
        // restaurant.save();
        // user.save();
        // comment ? response.send(comment) : next(new RestaurantNotFoundException());
    };

  private deleteComment = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.comment.findByIdAndDelete(id, { ...request.body }, (err, comment) => {
        !err ? response.send(comment) : next(new RestaurantNotFoundException(id));
      });
    } catch {
      next(new WrongCredentialsException());
    }
  };
}

export default CommentsController;
