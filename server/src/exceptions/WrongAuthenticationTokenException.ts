import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong services token');
  }
}

export default WrongAuthenticationTokenException;
