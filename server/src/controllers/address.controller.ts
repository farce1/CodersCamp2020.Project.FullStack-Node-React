import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import addressModel from '../models/address.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateAddressDto from '../dto/address.dto';
import AddressNotFoundException from '../exceptions/AddressNotFoundException';

class AddressController implements Controller {
  public path = '/addresses';
  public router = Router();
  private address = addressModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.getAddresses);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getAddressById);
    this.router.patch(`${this.path}/:id`, authMiddleware, this.updateAddress);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteAddress);
  }

  private getAddresses = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const address = await this.address.find().populate('restaurant');
      address ? response.send(address) : next(new AddressNotFoundException());
    } catch {
      next(new AddressNotFoundException());
    }
  };

  private getAddressById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      const address = await this.address.findById(id).populate('restaurant');
      address ? response.send(address) : next(new AddressNotFoundException(id));
    } catch {
      next(new AddressNotFoundException(id));
    }
  };

  private updateAddress = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const dataToUpdate = request.body;
    try {
      const address = await this.address.findByIdAndUpdate(id, { ...dataToUpdate }, { new: true });
      console.log(address, dataToUpdate);
      address ? response.send(address) : next(new AddressNotFoundException(id));
    } catch (e) {
      next(new AddressNotFoundException(id));
    }
  };

  private deleteAddress = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    try {
      await this.address.findByIdAndDelete(id, { ...request.body }, (err, address) => {
        !err ? response.send(address) : next(new AddressNotFoundException(id));
      });
    } catch {
      next(new AddressNotFoundException());
    }
  };
}

export default AddressController;
