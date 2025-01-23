import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;

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

  // // check if user blocked or not
  const isUserBlocked = user?.status;
  if (isUserBlocked === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This User is blocked!");
  }

  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not matched");
  }

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  // JWT applied
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
