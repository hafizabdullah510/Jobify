import { StatusCodes } from "http-status-codes";

class Unauthorized extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default Unauthorized;
