import { TUser } from "./type.js";
// extend user in Request so can use req.user;
declare global {
  namespace Express {
    interface Request {
      user?: TUser; // Define the user property
    }
  }
}
