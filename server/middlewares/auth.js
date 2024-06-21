import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import { asyncError } from "./error.js";

export const isAuthenticated = asyncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});
