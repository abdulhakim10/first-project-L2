/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Admin } from "./admin.model";
import { TAdmin } from "./admin.interface";
import mongoose from "mongoose";
import { User } from "../user/user.model";

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .fields()
    .sort()
    .paginate();
  const result = adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const isExist = await Admin.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not exist");
  }

  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const isExist = await Admin.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not exist");
  }

  //   destructuring non premitive data
  const { name, ...remainingData } = payload;

  // declare an object to store modified data
  const modifiedAdminData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedAdminData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedAdminData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const isExist = await Admin.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user dose not exist");
  }

  // step-1 create a session
  const session = await mongoose.startSession();

  try {
    // step-2 start transaction
    session.startTransaction();

    // delete admin (transaction-1) isolate session
    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }

    // get user _id from deleteAdmin
    const userId = deleteAdmin?.user;

    // delete user (transaction-2) isolate session
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    // if session done successfully commit transaction and end the session;
    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (err: any) {
    // if session failed abort transaction and end the session
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
