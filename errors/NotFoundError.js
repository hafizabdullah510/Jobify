import { StatusCodes } from "http-status-codes";

class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
