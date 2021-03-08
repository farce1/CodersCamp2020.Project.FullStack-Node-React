import 'dotenv/config';
import App from './app';
import AuthenticationController from './controllers/authentication.controller';
import UserController from './controllers/user.controller';
import validateEnv from './utils/validateEnv';
import RestaurantController from "./controllers/restaurant.controller";

validateEnv();

const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new RestaurantController()
  ],
);

app.listen();
