import baseException from "./base.exception";

class NotFoundException extends baseException {
  constructor(object = "Object") {
    super(404, `${object} not found`);
  }
}

export default NotFoundException;
