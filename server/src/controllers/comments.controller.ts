import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import restaurantModel from '../models/restaurant.model';
import RestaurantNotFoundException from '../exceptions/RestaurantNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import commentsModel from '../models/comments.model';
import CreateCommentDto from '../dto/comment.dto';
import userModel from '../models/user.model';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import CommentIsNotExist from '../exceptions/CommentIsNotExist';
import CommentTooShort from '../exceptions/CommentTooShort';
import permissionMiddleware from '../middleware/permission.middleware';
import commentDeleteMiddleware from '../middleware/commentDelete.middleware';
import commentEditMiddleware from '../middleware/editComment.middleware';

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
    this.router.get(`${this.path}`, authMiddleware, permissionMiddleware, this.getComments);
    this.router.get(`${this.path}/:id`, authMiddleware, permissionMiddleware, this.getCommentsById);
    this.router.put(
      `${this.path}/:restaurantId`,
      authMiddleware,
      validationMiddleware(CreateCommentDto),
      this.createComment
    );
    this.router.patch(`${this.path}/:id`, authMiddleware, commentEditMiddleware, this.editComment);
    this.router.delete(`${this.path}/:id`, authMiddleware, commentDeleteMiddleware, this.deleteComment);
  }

  private getComments = async (request: Request, response: Response, next: NextFunction) => {
    const comments = await this.comment.find();
    comments ? response.send(comments) : next(new CommentIsNotExist());
  };

  private getCommentsById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      const comment = await this.comment.findById(id).populate('restaurant', 'name').populate('user', 'lastName');
      comment ? response.send(comment) : next(new CommentIsNotExist());
    } catch {
      next(new CommentIsNotExist());
    }
  };

  private createComment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const restaurantId: string = request.params.restaurantId;
      if (!restaurantId) {
        return next(new RestaurantNotFoundException(restaurantId));
      }

      const restaurant = await this.restaurant.findById(restaurantId);
      if (!restaurant) {
        return next(new RestaurantNotFoundException(restaurantId));
      }
      const user = await this.user.findById(request.user._id);
      const postComment: CreateCommentDto = request.body;
      if (postComment.comment.length <2) {
        return next(new CommentTooShort());
      }
      const createdComment = await this.comment.create({
        ...postComment,
        user: [request.user._id],
        restaurant: [request.params.restaurantId],
      });

      const restaurantsComments = restaurant.get('comments', null, {getters: false});
      const userComments = user.get('comments', null, {getters: false});
      userComments.push(createdComment);
      restaurantsComments.push(createdComment);
      const savedComment = await createdComment.save();
      await savedComment.populate('restaurant','name').execPopulate();
      await savedComment.populate('user', 'lastName').execPopulate();
      await this.restaurant.findByIdAndUpdate(restaurantId, {
        comments: restaurant.comments
      }, { new: true });
      await this.user.findByIdAndUpdate(request.user._id, {
        comments: user.comments
      }, { new: true });
      response.send(savedComment);
    } catch {
      next(new CommentIsNotExist());
    }
  };

  private deleteComment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.comment.findByIdAndDelete(id, { ...request.body }, (err, comment) => {
        !err ? response.send(comment) : next(new CommentIsNotExist());
      });
    } catch {
      next(new WrongCredentialsException());
    }
  };

  private editComment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const dataToEdit = request.body;
    try {
      if (dataToEdit.comment.length < 2) {
        return next(new CommentTooShort());
      }
      const comment = await this.comment.findByIdAndUpdate(id, { ...dataToEdit }, { new: true })
      response.send({comment});
    } catch {
      next(new CommentIsNotExist());
    }
  };
}

export default CommentsController;