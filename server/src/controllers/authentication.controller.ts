import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import DataStoredInTokenInterface from '../interfaces/dataStoredInToken.interface';
import TokenData from '../interfaces/tokenData.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dto/user.dto';
import User from '../interfaces/user.interface';
import userModel from '../models/user.model';
import AuthenticationService from '../services/authentication.service';
import LogInDto from '../dto/logIn.dto';
import ResettingPassword from '../services/resettingPassword.service'

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();
  private user = userModel;
  private resettingPassword = new ResettingPassword();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
    this.router.post(`${this.path}/logout`, this.loggingOut);
    this.router.get(`${this.path}/confirm/:confirmationCode`, this.verifyUser);
    this.router.post(`${this.path}/forgot`, this.forgotPassword);
    this.router.patch(`${this.path}/forgetConfirm`, this.newPassword)
  }

  private newPassword = async(request: Request, response: Response, next: NextFunction) => {
    const thisRequest = this.user.findOne({
      resetPasswordToken: request.body.id
    })

    if(thisRequest){
      const newPassword = request.body.password;
      const hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT);

      this.user.findOne({
        resetPasswordToken: request.body.id,
      })
        .then((user) => {
          if (!user) {
            return response.status(404).send({ message: "User Not found." });
          }
    
          user.password = hashedPassword;
          user.save((err) => {
            if (err) {
              response.status(500).send({ message: err });
              return;
            }
          });
        })
        .catch((e) => console.log("error", e));
    }
  };

  private forgotPassword = async(request: Request, response: Response, next: NextFunction) =>{
    const userData = request.body;
    this.resettingPassword.resetPassword(userData);
  }

  private verifyUser = async (request: Request, response: Response, next: NextFunction)=>{
    this.user.findOne({
      confirmationCode: request.params.confirmationCode,
    })
      .then((user) => {
        if (!user) {
          return response.status(404).send({ message: "User Not found." });
        }
  
        user.status = "Active";
        user.save((err) => {
          if (err) {
            response.status(500).send({ message: err });
            return;
          }
        });
      })
      .catch((e) => console.log("error", e));
  }
  

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, user } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  };

  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {

    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user && user.status != "Active") {
      return response.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.get('password', null, { getters: false })
      );
      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  };

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInTokenInterface = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationController;
