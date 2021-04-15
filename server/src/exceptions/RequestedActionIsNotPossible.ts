import HttpException from './HttpException';

class RequestedActionIsNotPossible extends HttpException {
  constructor() {
    const idErrorMessage = `Requested action is not possible`;
    super(404, idErrorMessage);
  }
}

export default RequestedActionIsNotPossible;
