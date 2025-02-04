import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";

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

  // check if user blocked or not
  const isUserBlocked = user?.status;
  if (isUserBlocked === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This User is blocked!");
  }

  // check if password matched or not
  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not matched");
  }

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  // JWT applied
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: TChangePassword
) => {
  // check if the user is exist or not
  const user = await User.isUserExistByCustomId(userData?.id);
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

  // check if password matched or not
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not matched");
  }

  // new password hashing
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    { id: userData.id, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true }
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
};
