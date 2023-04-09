import { StatusCodes } from "http-status-codes";

class BadRequest extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
