import RequestWithUser from '../interfaces/requestWithUser.interface';
import { NextFunction, Response } from 'express';
import UserDoesNotHavePermissionToExecutedRequestedData from '../exceptions/UserDoesNotHavePermissionToExecutedRequestedData';
import commentsModel from '../models/comments.model';
import CommentIsNotExist from '../exceptions/CommentIsNotExist';
import UserDoesNotHavePermissionToEditThisComment from '../exceptions/UserDoesNotPermissiontoEditThisComment';

async function commentEditMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const commentId = request.params.id;
  let selectedComment = null;
  const userRole = request.user.userRole;
  const userId = request.user._id;
  const comment = commentsModel;

  try {
    selectedComment = await comment.findById(commentId);
    const commentOwner = selectedComment.user !== null && selectedComment.user;
    if ( userRole === 2) {
      commentOwner.toString() === userId.toString()
        ? next()
        : next (new UserDoesNotHavePermissionToEditThisComment());
    } else {
      next (new UserDoesNotHavePermissionToExecutedRequestedData());
    }
  } catch (error) {
    next(new CommentIsNotExist());
  }
}

export default commentEditMiddleware;