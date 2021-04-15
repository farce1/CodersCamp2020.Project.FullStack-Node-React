import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import DataStoredInTokenInterface from '../interfaces/dataStoredInToken.interface';
import TokenData from '../interfaces/tokenData.interface';
import CreateUserDto from '../dto/user.dto';
import User from '../interfaces/user.interface';
import userModel from '../models/user.model';
import addressModel from '../models/address.model';
import { response } from 'express';
import * as nodemailer from 'nodemailer';
class ResettingPassword {
  public user = userModel;
  public async resetPassword(userData: { email: string }) {
    if (!(await this.user.findOne({ email: userData.email }))) {
      throw new Error('No such email');
    }
    const secret = process.env.JWT_SECRET;
    const forgotToken = jwt.sign(userData.email, secret);

    this.user.update({ email: userData.email }, { resetPasswordToken: forgotToken }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'mernappcovid@gmail.com',
      to: userData.email,
      subject: 'Please confirm resetting password',
      html: `<h1>Password reset</h1>
    <p>Click following link to reset your password</p>
    <a href=${process.env.PATH_EMAIL_RESET}${forgotToken}> Click here</a>
    </div>`,
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: unknown }) =>
      error ? console.log('Error', error) : console.log('Email sent: ' + info.response)
    );
  }
}

export default ResettingPassword;
