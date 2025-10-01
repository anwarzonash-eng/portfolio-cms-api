import baseController from './base.controller';
import { authMiddleware, validationMiddleware } from '../middleware';
import { alreadyExistException } from '../exceptions';
import { CreateUserDto, LogInUserDto, GetSingleUserByEmailDto } from '../dtos';
import userNotAuthorizaedException from '../exceptions/userNotAuthorizaed.exception';

// import { databaseException } from '../exceptions/database.exceptions.js';

class authController extends baseController {
  constructor() {
    super('/auth');
    this.initializeRouter();
  }

  initializeRouter() {
    // console.log(LogInUserDto);
    this.router.post(
      `${this.parentRouterPath}/registeruser`,
      validationMiddleware(CreateUserDto),
      this.registerUser
    );
    this.router.post(
      `${this.parentRouterPath}/login`,
      validationMiddleware(LogInUserDto),
      this.login
    );
    this.router.post(
      `${this.parentRouterPath}/me`,
      validationMiddleware(GetSingleUserByEmailDto),
      this.getSingleUserByEmail
    );
  }

  registerUser = async (req, res, next) => {
    try {
      const user = await this._authService.isUserExist(
        req.body.email,
        req.body.userName
      );

      if (user) {
        res
          .status(400)
          .send(this._responseTemplate('Error', undefined, 'User Exists!'));
      }
      const userData = await this._authService.registerUser(req.body);
      // console.log(data);
      res.send(this._responseTemplate('Success', userData, undefined));
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await this._authService.login(
        req.body.emailOrUsername,
        req.body.password
      );

      if (user) {
        res
          .status(200)
          .send(this._responseTemplate('Success', user, undefined));
      } else {
        res
          .status(404)
          .send(this._responseTemplate('Error', undefined, 'User Not Exist'));
      }
    } catch (error) {
      next(error);
    }
  };
  getSingleUserByEmail = async (req, res, next) => {
    try {
      if (req.userData) new userNotAuthorizaedException();

      const user = await this._authService.getSingleUserByEmail(req.body.email);

      if (user) {
        res
          .status(200)
          .send(this._responseTemplate('Success', user, undefined));
      } else {
        res
          .status(400)
          .send(this._responseTemplate('Error', undefined, 'User Not Exist'));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default authController;
