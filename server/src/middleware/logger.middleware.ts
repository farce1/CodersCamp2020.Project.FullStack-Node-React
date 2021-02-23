import { NextFunction, Request } from 'controllers/user/controllers/post/express';

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  console.log(`${request.method} ${request.path}`);
  next();
}

export default loggerMiddleware;
