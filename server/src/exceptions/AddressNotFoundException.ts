import HttpException from './HttpException';

class AddressNotFoundException extends HttpException {
    constructor(id?: string) {
        const idErrorMessage = `Address with id ${id} not found`;
        const noneFoundErrorMessage = `No address found`;
        super(404, id ? idErrorMessage : noneFoundErrorMessage);
    }
}

export default AddressNotFoundException;
