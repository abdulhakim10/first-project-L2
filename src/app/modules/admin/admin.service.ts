import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Admin } from "./admin.model";
import { TAdmin } from "./admin.interface";

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

  const result = await Admin.findOne({ id });
  return result;
};

const updateAdminIntoDB = async (id: string, payload: TAdmin) => {
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
      modifiedAdminData[`name${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
};
