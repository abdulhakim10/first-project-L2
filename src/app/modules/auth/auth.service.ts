import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
// import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;

  // check if the user is exist or not
  const isUserExist = await User.isUserExistByCustomId(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if user deleted or not
  if (!(await User.isUserDeletedCheckByCustomId(id))) {
    throw new AppError(httpStatus.FORBIDDEN, "This User is deleted!");
  }

  // // check if user blocked or not
  if (await User.isUserBlockedCheckByCustomId(id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This User is blocked!");
  }

  if (!(await User.isPasswordMatched(password, isUserExist?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not matched");
  }

  // console.log();
  return {};
};

export const AuthServices = {
  loginUser,
};
