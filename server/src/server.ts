import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import ReportController from './report/report.controller';
import UserController from './controllers/user/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new AuthenticationController(),
    new ReportController(),
    new UserController()
  ],
);

app.listen();
