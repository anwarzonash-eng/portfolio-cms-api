import baseException from "./base.exception";

class userNotAuthorizaedException extends baseException {
  constructor() {
    super(401, `User is not Authorizaed`);
  }
}

export default userNotAuthorizaedException;
