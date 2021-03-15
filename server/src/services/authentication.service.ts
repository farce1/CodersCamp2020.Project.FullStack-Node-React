import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInTokenInterface from '../interfaces/dataStoredInToken.interface';
import TokenData from '../interfaces/tokenData.interface';
import CreateUserDto from '../dto/user.dto';
import User from '../interfaces/user.interface';
import userModel from '../models/user.model';
import addressModel from '../models/address.model';
const nodemailer = require('nodemailer');

class AuthenticationService {
  public user = userModel;
  public address = addressModel;
  public async register(userData: CreateUserDto) {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }

    const address = await this.address.create({
      ...userData.address,
    });

    const hashedPassword = await bcrypt.hash(userData.password, +process.env.SALT);

    const secret = process.env.JWT_SECRET;
    const confirmationToken = jwt.sign({email: userData.email}, secret)

    const user = await this.user.create({
      ...userData,
      address,
      password: hashedPassword,
      confirmationCode: confirmationToken,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      },
      secure: true
    });
    
    const mailOptions = {
      from: 'mernappcovid@gmail.com',
      to: userData.email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
      <h2>Hello ${userData.firstName}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:8080/auth/confirm/${confirmationToken}> Click here</a>
      </div>`

    };
    
    transporter.sendMail(mailOptions, function(error:string, info: {response:unknown}){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 


    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      user,
    };
  }
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: User): TokenData {
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

export default AuthenticationService;
