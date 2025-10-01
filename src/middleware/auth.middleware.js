import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";
import { UserModel } from "../models";
import { verifyToken } from "../utils/jwt";






export function authMiddleware(isSkipAuthorization = false) {

  return async (req, res, next) => {

    //  console.log(req.headers['authorization']? req.headers['authorization'] :'No Authorization' );

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
      next(new userNotAuthorizaedException())
    else {

      try {

        const user = await verifyToken(token);
        if (user) {

          console.log(user);
          const user_id = user._id;

          let isUserExist = await UserModel.findByPk(user_id)



          if (!isUserExist) {

            next(new userNotAuthorizaedException())

          }

          req.userData = user
          next()

        }
        else {

          next(new userNotAuthorizaedException())

        }
      } catch (error) {

        //next(new userNotAuthorizaedException())
        next(error)
      }
    }








  }
}