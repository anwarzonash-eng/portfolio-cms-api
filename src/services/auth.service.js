import { response } from "express";
import baseService from "./base.service";
import { createToken } from "../utils/jwt";
import { alreadyExistException } from "../exceptions";
import { Op } from "sequelize";
import { sequelize } from "../utils/database";
import bcrypt from "bcrypt";


export class authService extends baseService {
  async registerUser(userData) {


    const newUser = await this._userModel.create({

      email: userData.email,
      user_name: userData.userName,
      password: userData.password,

    });

    if (newUser) {
      const token = createToken(newUser);
      // console.log(token);
      return [newUser, token];
    }


  }

  async isUserExist(email, userName) {
    let user = await this._userModel.findOne({ where: { email: email } });

    if (user) {
      // console.log("Email Exists");
      // console.log(user);
      return user;
    } else {
      user = await this._userModel.findOne({ where: { user_name: userName } });
      if (user) {
        // console.log("User name Exists");
        // console.log(user);
        return user;
      }
    }

    return undefined;

    //return 'abc'
  }

  async login(emailOrUsername, password) {
    // console.log(emailOrUsername, password);

    let user = await this._userModel.findOne({
      where: {
        [Op.or]: [
          { email: emailOrUsername },
          { user_name: emailOrUsername }
        ]
      }
    });

    if (!user) {
      return undefined
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return undefined
    }
    else {
      const token = createToken(user);
      // console.log(token);
      return [user, token];
    }
    // else {

    //     user = await this._userModel.findOne({ where: { user_name: userName } })
    //     if (user) {
    //         console.log('User name Exists');
    //         console.log(user);
    //         return user;

    //     }

    // }

    //return 'abc'
  }

  async getSingleUserByEmail(userEmail) {
    let user = await this._userModel.findOne({
      where: { email: userEmail },
    });

    if (user) {
      const token = createToken(user);
      console.log(token);
      return [user, token];
    } else {
      return undefined;
    }
    // else {

    //     user = await this._userModel.findOne({ where: { user_name: userName } })
    //     if (user) {
    //         console.log('User name Exists');
    //         console.log(user);
    //         return user;

    //     }

    // }

    //return 'abc'
  }
}
