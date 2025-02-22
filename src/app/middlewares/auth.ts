import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/auth/auth.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as JwtPayload;

    const { id, role, iat } = decoded;

    // check if the user is exist or not
    const user = await User.isUserExistByCustomId(id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // check if user deleted or not
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This User is deleted!");
    }

    // check if user blocked or not
    const isUserBlocked = user?.status;
    if (isUserBlocked === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This User is blocked!");
    }

    if (
      user?.passwordChangeAt &&
      User.isJwtIssuedBeforePasswordUpdate(
        user?.passwordChangeAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized.");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized.");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
